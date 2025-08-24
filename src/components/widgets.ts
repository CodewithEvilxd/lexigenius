import GeneratePage from "@/app/dashboard/generate/page";
import Chat from "@/components/Chat";

export const widgets = [
  {
    id: "generate",
    name: "Generate Content",
    component: GeneratePage,
  },
  {
    id: "chatbot",
    name: "AI Chatbot",
    component: Chat,
  },
];
