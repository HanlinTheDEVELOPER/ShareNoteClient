/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
} from "@lexical/rich-text";
import { $isParentElementRTL, $setBlocksType } from "@lexical/selection";
import { $isTableNode } from "@lexical/table";
import {
  $findMatchingParent,
  $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $isTextNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  DEPRECATED_$isGridSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import { IS_APPLE } from "../../utils/environment";

import useModal from "../../hooks/useModal";
import DropDown, { DropDownItem } from "../../ui/DropDown";
import { getSelectedNode } from "../../utils/getSelectedNode";
import { sanitizeUrl } from "../../utils/url";
import { InsertInlineImageDialog } from "../InlineImagePlugin";
import { InsertTableDialog } from "../TablePlugin";

import MyIconButton from "../../../common/IconButton";
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconCode,
  IconItalic,
  IconLink,
  IconUnderline,
} from "@tabler/icons-react";

const blockTypeToBlockName = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

const rootTypeToRootName = {
  root: "Root",
  table: "Table",
};

function getCodeLanguageOptions() {
  const options = [];

  for (const [lang, friendlyName] of Object.entries(
    CODE_LANGUAGE_FRIENDLY_NAME_MAP
  )) {
    options.push([lang, friendlyName]);
  }

  return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

function dropDownActiveClass(active) {
  if (active) return "active dropdown-item-active";
  else return "";
}

function BlockFormatDropDown({
  editor,
  blockType,
  rootType,
  disabled = false,
}) {
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (
        $isRangeSelection(selection) ||
        DEPRECATED_$isGridSelection(selection)
      ) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatCheckList = () => {
    if (blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        let selection = $getSelection();

        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection))
              selection.insertRawText(textContent);
          }
        }
      });
    }
  };

  return (
    <DropDown
      disabled={disabled}
      buttonClassName="toolbar-item block-controls"
      buttonIconClassName={"icon block-type " + blockType}
      buttonLabel={blockTypeToBlockName[blockType]}
      buttonAriaLabel="Formatting options for text style"
    >
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "paragraph")}
        onClick={formatParagraph}
      >
        <i className="icon paragraph" />
        <span className="text">Normal</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "h1")}
        onClick={() => formatHeading("h1")}
      >
        <i className="icon h1" />
        <span className="text">Heading 1</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "h2")}
        onClick={() => formatHeading("h2")}
      >
        <i className="icon h2" />
        <span className="text">Heading 2</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "h3")}
        onClick={() => formatHeading("h3")}
      >
        <i className="icon h3" />
        <span className="text">Heading 3</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "bullet")}
        onClick={formatBulletList}
      >
        <i className="icon bullet-list" />
        <span className="text">Bullet List</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "number")}
        onClick={formatNumberedList}
      >
        <i className="icon numbered-list" />
        <span className="text">Numbered List</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "check")}
        onClick={formatCheckList}
      >
        <i className="icon check-list" />
        <span className="text">Check List</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "quote")}
        onClick={formatQuote}
      >
        <i className="icon quote" />
        <span className="text">Quote</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "code")}
        onClick={formatCode}
      >
        <i className="icon code" />
        <span className="text">Code Block</span>
      </DropDownItem>
    </DropDown>
  );
}

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [blockType, setBlockType] = useState("paragraph");
  const [rootType, setRootType] = useState("root");
  const [selectedElementKey, setSelectedElementKey] = useState(null);

  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [modal, showModal] = useModal();
  const [isRTL, setIsRTL] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        setRootType("table");
      } else {
        setRootType("root");
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type);
          }
          if ($isCodeNode(element)) {
            const language = element.getLanguage();
            setCodeLanguage(
              language ? CODE_LANGUAGE_MAP[language] || language : ""
            );
            return;
          }
        }
      }
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [$updateToolbar, activeEditor, editor]);

  const clearFormatting = useCallback(() => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const nodes = selection.getNodes();

        if (anchor.key === focus.key && anchor.offset === focus.offset) {
          return;
        }

        nodes.forEach((node, idx) => {
          // We split the first and last node by the selection
          // So that we don't format unselected text inside those nodes
          if ($isTextNode(node)) {
            if (idx === 0 && anchor.offset !== 0) {
              node = node.splitText(anchor.offset)[1] || node;
            }
            if (idx === nodes.length - 1) {
              node = node.splitText(focus.offset)[0] || node;
            }

            if (node.__style !== "") {
              node.setStyle("");
            }
            if (node.__format !== 0) {
              node.setFormat(0);
              $getNearestBlockElementAncestorOrThrow(node).setFormat("");
            }
          } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
            node.replace($createParagraphNode(), true);
          } else if ($isDecoratorBlockNode(node)) {
            node.setFormat("");
          }
        });
      }
    });
  }, [activeEditor]);

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const onCodeLanguageSelect = useCallback(
    (value) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [activeEditor, selectedElementKey]
  );

  return (
    <div className="toolbar">
      <MyIconButton
        disabled={!canUndo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
        type="button"
        // className="toolbar-item spaced"
        aria-label="Undo"
      >
        <IconArrowBackUp />
      </MyIconButton>
      <MyIconButton
        disabled={!canRedo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        title={IS_APPLE ? "Redo (⌘Y)" : "Redo (Ctrl+Y)"}
        type="button"
        aria-label="Redo"
      >
        <IconArrowForwardUp />
      </MyIconButton>
      <Divider />
      {blockType in blockTypeToBlockName && activeEditor === editor && (
        <>
          <BlockFormatDropDown
            disabled={!isEditable}
            blockType={blockType}
            rootType={rootType}
            editor={editor}
          />
          <Divider />
          <DropDown
            disabled={!isEditable}
            buttonLabel="Align"
            buttonIconClassName="icon left-align"
            buttonClassName="toolbar-item spaced alignment"
            buttonAriaLabel="Formatting options for text alignment"
          >
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
              }}
              className="item"
            >
              <i className="icon left-align" />
              <span className="text">Left Align</span>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
              }}
              className="item"
            >
              <i className="icon center-align" />
              <span className="text">Center Align</span>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
              }}
              className="item"
            >
              <i className="icon right-align" />
              <span className="text">Right Align</span>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
              }}
              className="item"
            >
              <i className="icon justify-align" />
              <span className="text">Justify Align</span>
            </DropDownItem>
            <Divider />
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(
                  OUTDENT_CONTENT_COMMAND,
                  undefined
                );
              }}
              className="item"
            >
              <i className={"icon " + (isRTL ? "indent" : "outdent")} />
              <span className="text">Outdent</span>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
              }}
              className="item"
            >
              <i className={"icon " + (isRTL ? "outdent" : "indent")} />
              <span className="text">Indent</span>
            </DropDownItem>
          </DropDown>
          <Divider />
        </>
      )}
      {blockType === "code" ? (
        <DropDown
          disabled={!isEditable}
          buttonClassName="toolbar-item code-language"
          buttonLabel={getLanguageFriendlyName(codeLanguage)}
          buttonAriaLabel="Select language"
        >
          {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
            return (
              <DropDownItem
                className={`item ${dropDownActiveClass(
                  value === codeLanguage
                )}`}
                onClick={() => onCodeLanguageSelect(value)}
                key={value}
              >
                <span className="text">{name}</span>
              </DropDownItem>
            );
          })}
        </DropDown>
      ) : (
        <>
          <MyIconButton
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            }}
            isActive={isBold}
            title={IS_APPLE ? "Bold (⌘B)" : "Bold (Ctrl+B)"}
            type="button"
            aria-label={`Format text as bold. Shortcut: ${
              IS_APPLE ? "⌘B" : "Ctrl+B"
            }`}
          >
            <IconBold />
          </MyIconButton>
          <MyIconButton
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            }}
            isActive={isItalic}
            title={IS_APPLE ? "Italic (⌘I)" : "Italic (Ctrl+I)"}
            type="button"
            aria-label={`Format text as italics. Shortcut: ${
              IS_APPLE ? "⌘I" : "Ctrl+I"
            }`}
          >
            <IconItalic />
          </MyIconButton>
          <MyIconButton
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
            }}
            isActive={isUnderline}
            title={IS_APPLE ? "Underline (⌘U)" : "Underline (Ctrl+U)"}
            type="button"
            aria-label={`Format text to underlined. Shortcut: ${
              IS_APPLE ? "⌘U" : "Ctrl+U"
            }`}
          >
            <IconUnderline />
          </MyIconButton>
          <MyIconButton
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
            }}
            isCode={isCode}
            title="Insert code block"
            type="button"
            aria-label="Insert code block"
          >
            <IconCode />
          </MyIconButton>
          <MyIconButton
            disabled={!isEditable}
            onClick={insertLink}
            isActive={isLink}
            aria-label="Insert link"
            title="Insert link"
            type="button"
          >
            <IconLink />
          </MyIconButton>
          <DropDown
            disabled={!isEditable}
            buttonClassName="toolbar-item spaced"
            buttonLabel=""
            buttonAriaLabel="Formatting options for additional text styles"
            buttonIconClassName="icon dropdown-more"
          >
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(
                  FORMAT_TEXT_COMMAND,
                  "strikethrough"
                );
              }}
              className={"item " + dropDownActiveClass(isStrikethrough)}
              title="Strikethrough"
              aria-label="Format text with a strikethrough"
            >
              <i className="icon strikethrough" />
              <span className="text">Strikethrough</span>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
              }}
              className={"item " + dropDownActiveClass(isSubscript)}
              title="Subscript"
              aria-label="Format text with a subscript"
            >
              <i className="icon subscript" />
              <span className="text">Subscript</span>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(
                  FORMAT_TEXT_COMMAND,
                  "superscript"
                );
              }}
              className={"item " + dropDownActiveClass(isSuperscript)}
              title="Superscript"
              aria-label="Format text with a superscript"
            >
              <i className="icon superscript" />
              <span className="text">Superscript</span>
            </DropDownItem>
            <DropDownItem
              onClick={clearFormatting}
              className="item"
              title="Clear text formatting"
              aria-label="Clear all text formatting"
            >
              <i className="icon clear" />
              <span className="text">Clear Formatting</span>
            </DropDownItem>
          </DropDown>
          {rootType === "table" && (
            <>
              <Divider />
              <DropDown
                disabled={!isEditable}
                buttonClassName="toolbar-item spaced"
                buttonLabel="Table"
                buttonAriaLabel="Open table toolkit"
                buttonIconClassName="icon table secondary"
              >
                <DropDownItem
                  onClick={() => {
                    /**/
                  }}
                  className="item"
                >
                  <span className="text">Table</span>
                </DropDownItem>
              </DropDown>
            </>
          )}
          {activeEditor === editor && (
            <>
              <Divider />
              <DropDown
                disabled={!isEditable}
                buttonClassName="toolbar-item spaced"
                buttonLabel="Insert"
                buttonAriaLabel="Insert specialized editor node"
                buttonIconClassName="icon plus"
              >
                <DropDownItem
                  onClick={() => {
                    activeEditor.dispatchCommand(
                      INSERT_HORIZONTAL_RULE_COMMAND,
                      undefined
                    );
                  }}
                  className="item"
                >
                  <i className="icon horizontal-rule" />
                  <span className="text">Horizontal Rule</span>
                </DropDownItem>
                <DropDownItem
                  onClick={() => {
                    showModal("Insert Inline Image", (onClose) => (
                      <InsertInlineImageDialog
                        activeEditor={activeEditor}
                        onClose={onClose}
                      />
                    ));
                  }}
                  className="item"
                >
                  <i className="icon image" />
                  <span className="text">Inline Image</span>
                </DropDownItem>
                <DropDownItem
                  onClick={() => {
                    showModal("Insert Table", (onClose) => (
                      <InsertTableDialog
                        activeEditor={activeEditor}
                        onClose={onClose}
                      />
                    ));
                  }}
                  className="item"
                >
                  <i className="icon table" />
                  <span className="text">Table</span>
                </DropDownItem>
              </DropDown>
            </>
          )}
        </>
      )}
      {modal}
    </div>
  );
}
