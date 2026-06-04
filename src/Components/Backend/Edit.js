import { useState } from "react";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import { useBlockProps } from "@wordpress/block-editor";
import Style from "../Common/Style";
import Settings from "./Settings/Settings";
import Theme from "../Common/Theme";
import { prefix } from "../../utils/data";
import ShortCode from "./ShortCode/ShortCode";

const Edit = (props) => {
  const { attributes, setAttributes, clientId, device, currentPostId, CPTType } = props;
  const { audioProperties } = attributes;

  const [activeIndex, setActiveIndex] = useState(0);

  const id = `${prefix}-${clientId}`;

  const shortcode = `[audio_player id=${currentPostId}]`;

  return (
    <>
      <Settings
        {...{
          attributes,
          setAttributes,
          device,
          activeIndex,
          setActiveIndex
        }}
      />

      {CPTType === "audio_player_block" && <ShortCode {...{ shortcode }} />}

      <div {...useBlockProps()} id={id}>
        <Style attributes={attributes} id={id} isBackend={true} />


        <div>
          {0 !== audioProperties?.length ? (
            <Theme {...{ attributes }} />
          ) : (
            <h3 className="bpMp3PlayerError">
              {__("Please add audio file first!", "audio-player-block")}
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default withSelect((select) => {
  const { getDeviceType } = select("core/editor");
  const currentPostId = select('core/editor').getCurrentPostId();
  const CPTType = select('core/editor').getCurrentPostType?.();

  return {
    device: getDeviceType()?.toLowerCase(),
    currentPostId,
    CPTType
  };
})(Edit);
