// OpenAI 兼容模型提供方扩展（pi 自定义 provider 注册）。
// 连接信息一律来自用户模型配置，由 worker 经容器环境注入：
//   BASE_URL / API_KEY / MODEL —— 本文件不含任何默认端点，
//   缺失时直接抛错（entrypoint 已先行快速失败，这里是第二道防线）。
export default function (pi) {
  const baseUrl = process.env.BASE_URL;
  const modelId = process.env.MODEL;
  if (!baseUrl || !modelId) {
    throw new Error(
      "BASE_URL / MODEL 未注入：请在平台的「模型配置」中补全 provider 连接信息",
    );
  }
  pi.registerProvider("model-provider", {
    name: "Model Provider",
    baseUrl: baseUrl,
    apiKey: "API_KEY",
    api: "openai-completions",
    models: [
      {
        id: modelId,
        name: modelId,
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
      },
    ],
  });
}
