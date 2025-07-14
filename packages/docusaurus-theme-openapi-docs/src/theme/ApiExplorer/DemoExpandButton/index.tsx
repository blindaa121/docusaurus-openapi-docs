/* ==========================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useEffect, useState } from "react";

import { translate } from "@docusaurus/Translate";
import ExitButton from "@theme/ApiExplorer/ApiCodeBlock/ExitButton";
import Request from "@theme/ApiExplorer/Request";
import Response from "@theme/ApiExplorer/Response";
import { ApiItem } from "docusaurus-plugin-openapi-docs/src/types";
import clsx from "clsx";
import Modal from "react-modal";

export interface Props {
  readonly item: NonNullable<ApiItem>;
  readonly className?: string;
}

export default function DemoExpandButton({
  item,
  className,
}: Props): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={
          isModalOpen
            ? translate({
                id: "theme.Demo.expandButtonExpanded",
                message: "Expanded",
                description: "The expanded button label on demo panel",
              })
            : translate({
                id: "theme.Demo.expandButtonAriaLabel",
                message: "Expand demo to fullscreen",
                description: "The ARIA label for expand demo button",
              })
        }
        title={translate({
          id: "theme.Demo.expand",
          message: "Expand",
          description: "The expand button label on demo panel",
        })}
        className={clsx(
          "clean-btn",
          className,
          "openapi-explorer__demo-expand-btn"
        )}
        onClick={() => setIsModalOpen(true)}
      >
        <span
          className="openapi-explorer__code-block-expand-btn-icons"
          aria-hidden="true"
        >
          <svg
            className="openapi-explorer__code-block-expand-btn-icon"
            viewBox="0 0 448 512"
          >
            <path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z" />
          </svg>
        </span>
      </button>
      <Modal
        className="openapi-explorer__demo-expand-modal-content"
        overlayClassName="openapi-explorer__demo-expand-modal-overlay"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="API Demo"
      >
        <div className="openapi-explorer__demo-expand-modal-body">
          <Request item={item} />
          <Response item={item} />
          <div className="openapi-explorer__code-block-btn-group">
            <ExitButton
              className="openapi-explorer__code-block-code-btn"
              handler={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
