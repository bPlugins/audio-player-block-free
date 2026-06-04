import { PanelRow, TextControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { produce } from "immer";
import { InlineDetailMediaUpload, Label } from "../../../../../../bpl-tools/Components";

const Item = ({ attributes, setAttributes, arrKey, index, setActiveIndex = false }) => {
  const items = attributes[arrKey];

  const updateAudioProperty = (property, val, childProperty = null) => {
    const newItems = produce(attributes[arrKey], (draft) => {
      if (null !== childProperty) {
        draft[index][property][childProperty] = val;
      } else {
        draft[index][property] = val;
      }
    });

    setAttributes({ [arrKey]: newItems });
    setActiveIndex && setActiveIndex(index);
  };

  return (
    <>
      <PanelRow>
        <Label className="">{__("Title:", "audio-player-block")}</Label>
        <TextControl
          value={items[index]?.title}
          onChange={(val) => updateAudioProperty("title", val)}
        />
      </PanelRow>

      <PanelRow>
        <Label className="">{__("Artist:", "audio-player-block")}</Label>
        <TextControl
          value={items[index]?.artist}
          onChange={(val) => updateAudioProperty("artist", val)}
        />
      </PanelRow>

      <Label>{__("Audio File:", "audio-player-block")}</Label>
      <InlineDetailMediaUpload
        value={items[index]?.audio}
        types={["audio"]}
        onChange={(val) => updateAudioProperty("audio", val)}
        placeholder={__("Enter Audio URL", "audio-player-block")}
      />

      <Label>{__("Cover Photo:", "audio-player-block")}</Label>
      <InlineDetailMediaUpload
        value={items[index]?.cover}
        types={["image"]}
        onChange={(val) => updateAudioProperty("cover", val)}
        placeholder={__("Enter Cover Image URL", "audio-player-block")}
      />
    </>
  );
};

export default Item;
