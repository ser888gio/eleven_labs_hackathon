import { useState, useEffect } from "react";
import { useConversation } from "@elevenlabs/react";
import { Mic, MicOff, Sparkles, Copy, Check } from "lucide-react";

function App() {
  const [bioData, setBioData] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Poll for bio from backend
  useEffect(() => {
    const pollBio = async () => {
      if (bioData) return;
      try {
        const response = await fetch("http://localhost:8000/bio/default");
        const data = await response.json();
        if (data.status === "complete" && data.bio) {
          setBioData(data.bio);
        }
      } catch (error) {
        // Ignore errors (backend might be down or not ready)
      }
    };

    const interval = setInterval(pollBio, 2000);
    return () => clearInterval(interval);
  }, [bioData]);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to AI agent");
    },
    onDisconnect: () => {
      console.log("Disconnected from AI agent");
    },
    onError: (error) => {
      console.error("Conversation error:", error);
    },
    clientTools: {
      displayBio: {
        description: "Display the generated dating bio to the user",
        parameters: {
          type: "object" as const,
          properties: {
            bio_text: {
              type: "string" as const,
              description: "The complete dating bio text to display",
            },
          },
          required: ["bio_text"],
        },
        handler: async ({ bio_text }: { bio_text: string }) => {
          setBioData(bio_text);
          return { success: true };
        },
      },
    },
  });

  const handleStartInterview = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId: import.meta.env.VITE_EL_AGENT_ID,
      });
    } catch (error) {
      console.error("Failed to start conversation", error);
    }
  };

  const handleEndInterview = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error("Failed to end session:", error);
    }
  };

  const copyToClipboard = async () => {
    if (bioData) {
      try {
        await navigator.clipboard.writeText(bioData);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };

  const isActive = conversation.status === "connected";
  const isSpeaking = conversation.isSpeaking;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white font-['Inter',sans-serif] overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoLTJ6bS0yIDJWMzRoLTJ2Mmgyem0tMiAydjJoMnYtMmgtMnptMi0yaDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-purple-200">
              AI-Powered Dating Consultant
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Stop Writing Boring Bios.
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Talk to <span className="font-semibold text-pink-400">Hitch</span>,
            your AI dating consultant. He'll write your profile for you.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            {isActive && isSpeaking && (
              <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-30"></div>
            )}

            {isActive && (
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"></div>
            )}

            <button
              onClick={isActive ? handleEndInterview : handleStartInterview}
              disabled={conversation.status === "connecting"}
              className={`
                relative group
                w-48 h-48 sm:w-56 sm:h-56 rounded-full
                flex flex-col items-center justify-center gap-3
                font-semibold text-lg
                transition-all duration-300 ease-out
                ${
                  isActive
                    ? "bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 shadow-[0_0_60px_rgba(236,72,153,0.5)]"
                    : "bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_0_60px_rgba(168,85,247,0.5)]"
                }
                hover:scale-105 active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                focus:outline-none focus:ring-4 focus:ring-purple-500/50
              `}
              aria-label={isActive ? "End interview" : "Start interview"}
            >
              <div
                className={`transition-transform ${
                  isSpeaking ? "scale-110" : "scale-100"
                }`}
              >
                {isActive ? (
                  <MicOff className="w-12 h-12 sm:w-14 sm:h-14" />
                ) : (
                  <Mic className="w-12 h-12 sm:w-14 sm:h-14" />
                )}
              </div>

              <span className="text-base sm:text-lg">
                {conversation.status === "connecting"
                  ? "Connecting..."
                  : isActive
                  ? "End Interview"
                  : "Start Interview"}
              </span>
            </button>
          </div>

          {isActive && (
            <div className="flex items-center gap-2 text-sm text-gray-300 animate-fade-in">
              <div className="flex gap-1">
                <div
                  className="w-1 h-4 bg-purple-500 rounded-full animate-wave"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-1 h-4 bg-pink-500 rounded-full animate-wave"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-1 h-4 bg-purple-500 rounded-full animate-wave"
                  style={{ animationDelay: "300ms" }}
                ></div>
                <div
                  className="w-1 h-4 bg-pink-500 rounded-full animate-wave"
                  style={{ animationDelay: "450ms" }}
                ></div>
              </div>
              <span>
                {isSpeaking ? "Hitch is speaking..." : "Listening..."}
              </span>
            </div>
          )}

          {bioData && (
            <div className="w-full max-w-3xl mt-8 animate-slide-up">
              <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8 sm:p-10 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-pink-400" />
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Your Perfect Bio
                    </h2>
                  </div>

                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600/50 hover:bg-purple-600/70 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    aria-label="Copy bio to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm font-medium">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {bioData}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-20 text-center text-gray-400 text-sm">
          <p>Powered by ElevenLabs AI Voice Technology</p>
        </div>
      </div>
    </div>
  );
}

export default App;
