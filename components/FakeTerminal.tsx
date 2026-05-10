"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type FakeTerminalProps = {
  open: boolean;
  onClose: () => void;
};

type Entry = {
  kind: "input" | "output";
  text: string;
};

const commandMap: Record<string, string[]> = {
  help: ["whoami", "ls projects", "cat skills.txt", "clear"],
  whoami: ["astik", "student builder", "python dev", "aiml explorer"],
  "ls projects": ["traffic-detection-system", "traffic-accident-severity-prediction", "smash-sessions-unleashed"],
  "cat skills.txt": ["Python", "C", "ML", "FastAPI", "Next.js", "Arduino", "Git", "Networking", "UI/UX"],
  clear: []
};

export function FakeTerminal({ open, onClose }: FakeTerminalProps) {
  const [entries, setEntries] = useState<Entry[]>([
    { kind: "output", text: "Type help to inspect the portfolio environment." }
  ]);
  const [command, setCommand] = useState("");

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "`") {
        event.preventDefault();
        if (open) {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, open]);

  const prompt = useMemo(() => "astik@portfolio:~$", []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = command.trim().toLowerCase();
    if (!normalized) return;

    setEntries((current) => {
      if (normalized === "clear") {
        return [];
      }
      const output = commandMap[normalized] ?? [`command not found: ${normalized}`];
      return [
        ...current,
        { kind: "input" as const, text: command },
        ...output.map((line) => ({ kind: "output" as const, text: line }))
      ];
    });
    setCommand("");
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-3xl rounded-3xl border border-accent/20 bg-[#07070f]/95 p-4 shadow-2xl shadow-accent/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent/90">Terminal</p>
              <p className="mt-1 text-xs text-muted">Ctrl+` to close • try help</p>
            </div>
            <button type="button" onClick={onClose} className="rounded-full border border-white/10 p-2 text-text">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="terminal-glow mt-4 max-h-72 overflow-y-auto rounded-2xl border border-white/10 bg-black/60 p-4 font-mono text-sm text-text">
            {entries.map((entry, index) => (
              <div key={`${entry.kind}-${index}`} className="mb-2 leading-7">
                {entry.kind === "input" ? <span className="text-accent">{prompt} </span> : <span className="text-muted">{">"} </span>}
                <span>{entry.text}</span>
              </div>
            ))}
            <form onSubmit={submit} className="mt-3 flex items-center gap-2">
              <span className="text-accent">{prompt}</span>
              <input
                autoFocus
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-muted"
                placeholder="whoami"
              />
            </form>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}