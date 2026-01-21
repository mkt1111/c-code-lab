import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

interface CodeBlockProps {
  code: string;
  variant?: "default" | "good" | "bad";
  title?: string;
  className?: string;
}

export const CodeBlock = ({ code, variant = "default", title, className }: CodeBlockProps) => {
  const bgClasses = {
    default: "bg-code-bg",
    good: "bg-code-good border-l-4 border-success",
    bad: "bg-code-bad border-l-4 border-destructive"
  };

  const Icon = variant === "good" ? CheckCircle2 : variant === "bad" ? XCircle : null;
  const iconColor = variant === "good" ? "text-success" : "text-destructive";

  return (
    <div className={cn("rounded-lg overflow-hidden", className)}>
      {title && (
        <div className={cn(
          "px-4 py-2 flex items-center gap-2 text-sm font-medium",
          variant === "good" ? "bg-success/20 text-success" : 
          variant === "bad" ? "bg-destructive/20 text-destructive" : 
          "bg-muted text-muted-foreground"
        )}>
          {Icon && <Icon className={cn("w-4 h-4", iconColor)} />}
          {title}
        </div>
      )}
      <pre className={cn(
        "p-4 overflow-x-auto text-sm font-mono leading-relaxed",
        bgClasses[variant]
      )}>
        <code className="text-foreground">{highlightSyntax(code)}</code>
      </pre>
    </div>
  );
};

function highlightSyntax(code: string): React.ReactNode {
  // Simple syntax highlighting for C#
  const keywords = [
    'public', 'private', 'protected', 'internal', 'class', 'interface', 'struct', 'enum',
    'abstract', 'virtual', 'override', 'sealed', 'static', 'readonly', 'const',
    'async', 'await', 'return', 'if', 'else', 'for', 'foreach', 'while', 'do',
    'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw',
    'new', 'this', 'base', 'null', 'true', 'false', 'var', 'void', 'get', 'set',
    'where', 'in', 'out', 'ref', 'using', 'namespace', 'delegate', 'event',
    'yield', 'lock', 'is', 'as', 'typeof', 'sizeof', 'default', 'init'
  ];
  
  const types = [
    'int', 'string', 'bool', 'double', 'float', 'decimal', 'byte', 'char', 'long',
    'short', 'uint', 'ulong', 'ushort', 'object', 'Task', 'List', 'Dictionary',
    'HashSet', 'Queue', 'Stack', 'Array', 'Span', 'Memory', 'Action', 'Func',
    'IEnumerable', 'ICollection', 'IList', 'StringBuilder', 'Exception'
  ];

  const lines = code.split('\n');
  
  return lines.map((line, lineIndex) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let keyIndex = 0;
    
    while (remaining.length > 0) {
      // Check for comments
      const commentMatch = remaining.match(/^(\/\/.*)$/);
      if (commentMatch) {
        parts.push(
          <span key={keyIndex++} className="text-syntax-comment">{commentMatch[1]}</span>
        );
        remaining = "";
        continue;
      }
      
      // Check for strings
      const stringMatch = remaining.match(/^("(?:[^"\\]|\\.)*")/);
      if (stringMatch) {
        parts.push(
          <span key={keyIndex++} className="text-syntax-string">{stringMatch[1]}</span>
        );
        remaining = remaining.slice(stringMatch[1].length);
        continue;
      }
      
      // Check for numbers
      const numberMatch = remaining.match(/^(\d+\.?\d*[mdfL]?)/);
      if (numberMatch) {
        parts.push(
          <span key={keyIndex++} className="text-syntax-number">{numberMatch[1]}</span>
        );
        remaining = remaining.slice(numberMatch[1].length);
        continue;
      }
      
      // Check for keywords
      let foundKeyword = false;
      for (const keyword of keywords) {
        const regex = new RegExp(`^(${keyword})(?![a-zA-Z0-9_])`);
        const match = remaining.match(regex);
        if (match) {
          parts.push(
            <span key={keyIndex++} className="text-syntax-keyword">{match[1]}</span>
          );
          remaining = remaining.slice(match[1].length);
          foundKeyword = true;
          break;
        }
      }
      if (foundKeyword) continue;
      
      // Check for types
      let foundType = false;
      for (const type of types) {
        const regex = new RegExp(`^(${type})(?:<|>|\\[|\\]|\\s|\\(|\\)|,|\\.|;|$)`);
        const match = remaining.match(regex);
        if (match) {
          parts.push(
            <span key={keyIndex++} className="text-syntax-class">{type}</span>
          );
          remaining = remaining.slice(type.length);
          foundType = true;
          break;
        }
      }
      if (foundType) continue;
      
      // Check for method calls
      const methodMatch = remaining.match(/^([A-Z][a-zA-Z0-9]*)\s*\(/);
      if (methodMatch) {
        parts.push(
          <span key={keyIndex++} className="text-syntax-method">{methodMatch[1]}</span>
        );
        remaining = remaining.slice(methodMatch[1].length);
        continue;
      }
      
      // Default: add single character
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    }
    
    return (
      <span key={lineIndex}>
        {parts}
        {lineIndex < lines.length - 1 && '\n'}
      </span>
    );
  });
}
