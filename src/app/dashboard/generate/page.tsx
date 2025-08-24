"use client";

import Image from "next/image";
import { generateText } from "@/lib/generate";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import ReactMarkdown from "react-markdown";
import { Clipboard, Check } from "lucide-react";
import NotificationModal from "@/components/NotificationModal";
import { handleCopy } from "@/lib/copyClipboard";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";



const contentTypes = [
  "Email",
  "LinkedIn Post",
  "Bio",
  "Twitter Thread",
  "Cold Outreach Message",
  "Instagram Caption",
  "Product Description",
  "Cover Letter",
  "Blog Intro",
  "Job Application Summary",
];

const tones = [
  "Neutral",
  "Formal",
  "Informal",
  "Persuasive",
  "Humorous",
  "Confident",
  "Empathetic",
  "Direct",
];

const lengths = [
  "Short",
  "Medium",
  "Long",
  "100 words",
  "200 words",
  "500 words",
];

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Dutch",
  "Russian",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
];

export default function GeneratePage() {
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [userGeneratedContext, setUserGeneratedContext] = useState("");
  const [previousGeneratedContentType, setPreviousGeneratedContentType] =
    useState("");

  const [type, setType] = useState(contentTypes[0]);
  const [tone, setTone] = useState(tones[0]);
  const [length, setLength] = useState(lengths[0]);
  const [keywords, setKeywords] = useState("");
  const [isImproving, setIsImproving] = useState(false);
  const [showImproveWarning, setShowImproveWarning] = useState(false);
  const [language] = useState(languages[0]);
  const [mode, setMode] = useState("generate");

  const currentUser = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [originalContentType, setOriginalContentType] = useState<string | null>(
    null
  );

  const copyButton = () => {
    handleCopy(output, setCopied, 1);
  };

  const handleExportTxt = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type.toLowerCase().replace(/ /g, "-")}-generated-by-lexigenius.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      // Only scroll when loading changes AFTER first render
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } else {
      didMount.current = true;
    }
  }, [loading]);


  const handleGenerate = async () => {
    if (!context.trim() || !currentUser?.uid) {
      setError(
        "Please Select the Content Type and write what you want to generate"
      );
      return;
    }
    if (!originalContentType) {
      setOriginalContentType(type);
    }

    setOutput("");
    setUserGeneratedContext(context);
    setPreviousGeneratedContentType((prev) => (isImproving ? prev : type));
    setContext("");
    setLoading(true);

    try {
      await generateText({
        prompt: context,
        type: type,
        tone: tone,
        length: length,
        keywords: keywords,
        isImproving: isImproving,
        uid: currentUser.uid,
        language: language,
        ...(isImproving && {
          originalPrompt: userGeneratedContext,
          previousResponse: output,
        }),
        onToken: (chunk) => {
          setOutput((prev) => {
            const updated = prev + chunk;
            setTimeout(() => {
              scrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 0);
            return updated;
          });
        },
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsImproving(checked);

    if (showImproveWarning && checked) {
      setShowImproveWarning(false);
    }

    // Reset to original type if "Improve" is activated after type change
    if (checked && originalContentType && type !== originalContentType) {
      setType(originalContentType);
    }
  };

  return (
    <div className="w-[100vw] ml-[4.2em] pr-2  md:w-[70vw] rounded-xl  md:ml-0 md:mr-0  md:px-3 py-5 mt-2 ">
      <div className="border-b-[1px] dark:border-[#353535db] border-[#c3c3c3]  pb-10">
        <h2 className="text-2xl font-bold mb-4 text-orange-600 text-center">
          Generate Content
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-500 mb-1">
            Content Type
          </label>
          <select
            value={type}
            onMouseDown={(e) => {
              if (isImproving) {
                e.preventDefault(); // ⛔ Prevent dropdown from opening
                setShowImproveWarning(true);
                setTimeout(() => setShowImproveWarning(false), 2500);
              }
            }}
            onChange={(e) => {
              if (!isImproving) {
                setType(e.target.value);
              }
            }}
            disabled={loading}
            className={`w-full border border-zinc-300 dark:border-gray-800 focus:outline-none focus:border-orange-400 focus:dark:border-orange-900 dark:bg-[#282828a7] bg-[#ececec] rounded-md p-2 placeholder:text-zinc-500 ${ (isImproving || loading) && "text-zinc-400 dark:text-zinc-700 cursor-not-allowed" }`}
          >
            {contentTypes.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-500 mb-1">
            Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            disabled={loading}
            className={`w-full border border-zinc-300 dark:border-gray-800 focus:outline-none focus:border-orange-400 focus:dark:border-orange-900 dark:bg-[#282828a7] bg-[#ececec] rounded-md p-2 placeholder:text-zinc-500 ${ loading && "text-zinc-400 dark:text-zinc-700 cursor-not-allowed" }`}
          >
            {tones.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-500 mb-1">
            Length
          </label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            disabled={loading}
            className={`w-full border border-zinc-300 dark:border-gray-800 focus:outline-none focus:border-orange-400 focus:dark:border-orange-900 dark:bg-[#282828a7] bg-[#ececec] rounded-md p-2 placeholder:text-zinc-500 ${ loading && "text-zinc-400 dark:text-zinc-700 cursor-not-allowed" }`}
          >
            {lengths.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-500  mb-1">
            What do you want to generate?
          </label>
          <textarea
            disabled={loading}
            rows={5}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className={`w-full border border-zinc-300 dark:border-gray-800  focus:outline-none focus:border-orange-400 focus:dark:border-orange-900 dark:bg-[#282828a7] bg-[#ececec]  rounded-md p-2 placeholder:text-zinc-500 ${ loading ? "placeholder:text-zinc-300 placeholder:dark:text-zinc-700 dark:bg-[#1F1F20]" : "" }`}
            placeholder="e.g., Write a follow-up email after a job interview..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-500 mb-1">
            Mode
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            disabled={loading}
            className={`w-full border border-zinc-300 dark:border-gray-800 focus:outline-none focus:border-orange-400 focus:dark:border-orange-900 dark:bg-[#282828a7] bg-[#ececec] rounded-md p-2 placeholder:text-zinc-500 ${ loading && "text-zinc-400 dark:text-zinc-700 cursor-not-allowed" }`}
          >
            {/* Options will be dynamically generated from the modes array */}
            {['generate', 'summarize', 'expand', 'correct', 'explain', 'rewrite', 'grammar_correct', 'tone_change', 'keyword_extract', 'question_generate', 'headline_generate', 'translate', 'sentiment_analysis', 'content_brief'].map((m) => (
              <option key={m} value={m}>
                {m.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-500 mb-1">
            Keywords (comma-separated, optional)
          </label>
          <input
            type="text"
            disabled={loading}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className={`w-full border border-zinc-300 dark:border-gray-800 focus:outline-none focus:border-orange-400 focus:dark:border-orange-900 dark:bg-[#282828a7] bg-[#ececec] rounded-md p-2 placeholder:text-zinc-500 ${ loading && "text-zinc-400 dark:text-zinc-700 cursor-not-allowed" }`}
            placeholder="e.g., AI, writing, assistant"
          />
        </div>
        <div className={`flex items-center gap-2 mb-4`}>
          <input
            id="improve-mode"
            type="checkbox"
            checked={isImproving}
            onChange={(e) => handleCheckbox(e)}
            disabled={!output || context.length > 0}
            className="w-4 h-4"
          />
          <label
            htmlFor="improve-mode"
            className="text-[0.9rem] sm:text-sm text-zinc-600 dark:text-zinc-400"
          >
            Improve previous result
          </label>
          {showImproveWarning && (
            <>
              {/* Show on <500px */}
              <span className="text-[0.8rem] text-orange-500 animate-pulse ml-2 sm:hidden">
                Uncheck first!
              </span>

              {/* Show on ≥500px (optional fallback) */}
              <span className="hidden sm:inline text-xs text-orange-500 animate-pulse ml-2">
                Uncheck to change content type
              </span>
            </>
          )}
        </div>

        <button
          disabled={loading}
          onClick={handleGenerate}
          className={`w-full md:w-24 px-4 py-2 rounded-md flex items-center justify-center transition-colors duration-200 border-y-2 border-transparent active:border-red-500 ${
            loading
              ? "pointer-events-none text-zinc-400 dark:text-zinc-700 bg-zinc-300 dark:bg-zinc-800"
              : "text-red-600 bg-zinc-300 dark:bg-zinc-800"
          }`}
        >
          {isImproving ? "Improve" : "Generate"}
        </button>
      </div>

      {userGeneratedContext && (
        <div className="mt-8 flex justify-end items-start gap-2">
          {/* Message Bubble */}
          <div
            className="max-w-[90%] md:max-w-[70%] text-white p-4 rounded-xl rounded-br-none shadow-md text-sm "
            style={{
              background:
                "linear-gradient(90deg,rgba(255, 113, 25, 1) 1%, rgba(255, 0, 0, 1) 100%)",
            }}
          >
            {userGeneratedContext}
          </div>
          {/* User Icon */}
          <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                        <Image
              src={currentUser?.photoURL || "/default-avatar.png"}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        </div>
      )}

      {/* 🤖 AI Response */}
      {(output || loading) && (
        <div className="mt-4 flex justify-start items-start gap-2">
          {/* AI Icon */}
          <div className="shrink-0 w-8 hidden  h-8 rounded-full bg-gray-400 text-white md:flex items-center justify-center text-xs font-bold dark:bg-gray-600 overflow-hidden">
                        <Image src="/meta.webp" alt="" width={32} height={32} />
          </div>

          {/* AI Message Bubble */}
          <div className="max-w-[100%] md:max-w-[80%] bg-gray-200 dark:bg-[#222222] text-gray-900 dark:text-gray-200 p-4 rounded-xl rounded-bl-none shadow-md text-sm relative space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm  text-zinc-400 dark:text-zinc-600">
                {loading
                  ? `Generating ${previousGeneratedContentType}...`
                  : `Generated ${previousGeneratedContentType}`}
              </h3>

              <button
                onClick={copyButton}
                className={`text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 ${
                  loading ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                {copied === 1 ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Clipboard className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Output */}
            <div className=" whitespace-pre-wrap ">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {output}
              </ReactMarkdown>

              {loading && <span className="animate-pulse">▍</span>}
            </div>

            

            {/* Export Button */}
            {output && !loading && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleExportTxt}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Export as TXT
                </button>
              </div>
            )}

            {/* Scroll Anchor */}
            <div ref={scrollRef} className="transition-all duration-300" />
          </div>
        </div>
      )}

      {error && (
        <NotificationModal
          title="Failed"
          message={error}
          onClose={() => setError("")}
          onConfirm={() => setError("")}
          buttonText="Ok"
        />
      )}
    </div>
  );
}