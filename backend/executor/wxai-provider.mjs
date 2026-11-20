// wxai provider：pi 的自定义模型提供方扩展。
// 凭据经环境变量 WXAI_API_KEY 注入，镜像内不落盘；模型与端点同理由
// WXAI_MODEL / WXAI_BASE_URL 覆盖（entrypoint 默认值见 entrypoint.sh）。
export default function (pi) {
  pi.registerProvider("wxai", {
    name: "Model Provider",
    baseUrl: process.env.WXAI_BASE_URL || "https://model-provider.example.com/v1",
    apiKey: "WXAI_API_KEY",
    api: "openai-completions",
    models: [
      {
        id: process.env.WXAI_MODEL || "demo-model",
        name: "RCH GLM (wxai)",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
      },
    ],
  });
}
