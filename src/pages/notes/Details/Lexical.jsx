import { useEffect, useRef, useState } from "react";
import useMediaQuery from "../../../components/lexical/hooks/useMediaQuery";
// import "../../../components/lexical/index.css";
import "./lexical.css";

import { TRANSFORMERS } from "@lexical/markdown";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";

import Nodes from "../../../components/lexical/nodes";
import EditorTheme from "../../../components/lexical/themes/EditorTheme";

import LexicalAutoLinkPlugin from "../../../components/lexical/plugins/AutoLinkPlugin/index";
import CodeHighlightPlugin from "../../../components/lexical/plugins/CodeHighlightPlugin";
import DragDropPaste from "../../../components/lexical/plugins/DragDropPastePlugin";
import FloatingLinkEditorPlugin from "../../../components/lexical/plugins/FloatingLinkEditorPlugin";
import InlineImagePlugin from "../../../components/lexical/plugins/InlineImagePlugin";
import LinkPlugin from "../../../components/lexical/plugins/LinkPlugin";
import ToolbarPlugin from "../../../components/lexical/plugins/ToolbarPlugin";
import ContentEditable from "../../../components/lexical/ui/ContentEditable";
import Placeholder from "../../../components/lexical/ui/Placeholder";
// import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin'

const loadContent = () => {
  // 'empty' editor
  const value =
    '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

  return value;
};

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

export default function Editor({ content }) {
  const isSmallWidthViewPort = useMediaQuery("(max-width: 1025px)");
  const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);
  const placeholder = (
    <Placeholder>What You See Is What You Get...</Placeholder>
  );
  const editorStateRef = useRef();
  const initialEditorState = loadContent();
  const initialConfig = {
    namespace: "MyEditor",
    editorState: content,
    theme: EditorTheme,
    onError,
    nodes: [...Nodes],
    showTreeView: true,
    editable: false,
  };

  const onRef = (_floatingAnchorElem) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-shell">
        <div className="editor-container tree-view" id="readOnly">
          <LexicalAutoLinkPlugin />
          <InlineImagePlugin />
          <CheckListPlugin />
          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor readOnly" ref={onRef}>
                  <ContentEditable />
                </div>
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />

          <ListPlugin />
          <CodeHighlightPlugin />
          <TablePlugin hasCellMerge={true} hasCellBackgroundColor={true} />
          <HorizontalRulePlugin />
          <LinkPlugin />
          {floatingAnchorElem && !isSmallWidthViewPort && (
            <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
          )}
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
