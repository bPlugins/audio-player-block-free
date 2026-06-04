import { __ } from "@wordpress/i18n";
import { TabPanel, PanelBody, __experimentalUnitControl as UnitControl, PanelRow } from "@wordpress/components";
import { pxUnit, perUnit, emUnit, remUnit } from "../../../../../../bpl-tools/utils/options";
import { ColorControl, ColorsControl, Device, Label, Typography, Notice } from "../../../../../../bpl-tools/Components";
import { getByDevice, setByDevice } from "../../../../utils/functions";

const Style = ({ attributes, setAttributes, device, updateObj }) => {
  const { style = {}, options = {}, elements = {} } = attributes;
  const { height = {}, title = {}, artist = {}, thumbnail = {}, range = {}, controls = {}, time = {} } = style || {};
  const { theme } = options;

  return (
    <>
      <PanelBody
        className="bPlPanelBody"
        title={__("Player Wrapper", "audio-player-block")}
      >
        <PanelRow>
          <Label className="">{__("Width", "audio-player-block")}</Label>
          <Device />
        </PanelRow>
        <UnitControl
          value={getByDevice(attributes, "width", device)}
          onChange={(val) => setByDevice(setAttributes, "width", device, val)}
          units={[pxUnit(), perUnit()]}
        />

        <PanelRow className="mt20">
          <Label className="">{__("Height", "audio-player-block")}</Label>
          <Device />
        </PanelRow>
        <UnitControl
          value={height[device]}
          onChange={(val) => updateObj("style", val, "height", device)}
          units={[pxUnit(), perUnit()]}
        />
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Audio Property", "audio-player-block")}
        initialOpen={false}
      >
        <Typography
          label={__("Title Typo", "audio-player-block")}
          value={title.typo}
          onChange={(val) => updateObj("style", val, "title", "typo")}
        />

        <ColorsControl
          className="mt15"
          label={__("Title Colors", "audio-player-block")}
          value={title.colors}
          onChange={(val) => updateObj("style", val, "title", "colors")}
        />



        <Typography
          className="mt20"
          label={__("Artist Typo", "audio-player-block")}
          value={artist.typo}
          onChange={(val) => updateObj("style", val, "artist", "typo")}
        />

        <ColorsControl
          className="mt15"
          label={__("Artist Colors", "audio-player-block")}
          value={artist.colors}
          onChange={(val) => updateObj("style", val, "artist", "colors")}
        />

        <Notice status='premium' isIcon={true} className='mt20'>
          {__('Artist Opacity is available in the Pro version.', 'audio-player-block')}
        </Notice>

      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Thumbnail", "audio-player-block")}
        initialOpen={false}
      >
        <PanelRow>
          <Label className="">{__("Width", "audio-player-block")}</Label>
          <Device />
        </PanelRow>
        <UnitControl
          value={thumbnail.width[device]}
          onChange={(val) =>
            updateObj("style", val, "thumbnail", "width", device)
          }
          units={[pxUnit(), perUnit(), emUnit(), remUnit()]}
        />

        {theme === "slider" && (
          <>
            <PanelRow className="mt20">
              <Label className="">
                {__("Slider Height", "audio-player-block")}
              </Label>
              <Device />
            </PanelRow>
            <UnitControl
              value={thumbnail.sliderHeight[device]}
              onChange={(val) =>
                updateObj("style", val, "thumbnail", "sliderHeight", device)
              }
              units={[pxUnit(), emUnit(), remUnit()]}
            />
          </>
        )}

        <Notice status='premium' isIcon={true} className='mt20'>
          {__('Thumbnail Border & Border Radius settings are available in the Pro version.', 'audio-player-block')}
        </Notice>
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Track/Range", "audio-player-block")}
        initialOpen={false}
      >
        <TabPanel
          className="bPlTabPanel small"
          activeClass="activeTab"
          tabs={[
            { name: "input", title: __("Input", "audio-player-block") },
            ...(theme === "slider" && elements?.thumb
              ? [{ name: "thumb", title: __("Thumb", "audio-player-block") }]
              : []),
          ]}
        >
          {(tab) => (
            <>
              {"input" === tab.name && (
                <>
                  <PanelRow className="mt10">
                    <Label className="">{__("Width", "audio-player-block")}</Label>
                    <Device />
                  </PanelRow>
                  <UnitControl
                    value={range.input.width[device]}
                    onChange={(val) =>
                      updateObj("style", val, "range", "input", "width", device)
                    }
                    units={[pxUnit(), perUnit(), emUnit(), remUnit()]}
                  />

                  <ColorControl
                    className="mt20"
                    label={__("Color", "audio-player-block")}
                    value={range.input.color}
                    onChange={(val) =>
                      updateObj("style", val, "range", "input", "color")
                    }
                  />

                  <ColorControl
                    label={__("Progress Color", "audio-player-block")}
                    value={range.input.progressColor}
                    onChange={(val) =>
                      updateObj("style", val, "range", "input", "progressColor")
                    }
                  />
                </>
              )}

              {"thumb" === tab.name && theme === "slider" && elements?.thumb && (
                <ColorControl
                  className="mt20"
                  label={__("Color", "audio-player-block")}
                  value={range.thumb.color}
                  onChange={(val) =>
                    updateObj("style", val, "range", "thumb", "color")
                  }
                />
              )}
            </>
          )}
        </TabPanel>

        <Notice status='premium' isIcon={true} className='mt20'>
          {theme === 'slider'
            ? __('Input Height, Border Radius, and seek slider Thumb (Width, Shadow, Outline, Radius) settings are available in the Pro version.', 'audio-player-block')
            : __('Input Height and Border Radius settings are available in the Pro version.', 'audio-player-block')
          }
        </Notice>
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Controls", "audio-player-block")}
        initialOpen={false}
      >
        <UnitControl
          label={__("Size", "audio-player-block")}
          value={controls.size}
          onChange={(val) => updateObj("style", val, "controls", "size")}
          units={[pxUnit()]}
        />

        <UnitControl
          className="mt20"
          label={__("Play & Pause Size", "audio-player-block")}
          value={controls.playPauseSize}
          onChange={(val) =>
            updateObj("style", val, "controls", "playPauseSize")
          }
          units={[pxUnit()]}
        />

        <ColorsControl
          className="mt20"
          label={__("Colors", "audio-player-block")}
          value={controls.colors}
          onChange={(val) => updateObj("style", val, "controls", "colors")}
        />

        <ColorsControl
          label={__("Hover Colors", "audio-player-block")}
          value={controls.hovColors}
          onChange={(val) => updateObj("style", val, "controls", "hovColors")}
        />

        <ColorsControl
          className="mt20"
          label={__("Play & Pause Colors", "audio-player-block")}
          value={controls.playPauseColors}
          onChange={(val) =>
            updateObj("style", val, "controls", "playPauseColors")
          }
        />

        <ColorsControl
          className="mb20"
          label={__("Play & Pause Hover Colors", "audio-player-block")}
          value={controls.playPauseHovColors}
          onChange={(val) =>
            updateObj("style", val, "controls", "playPauseHovColors")
          }
        />

        <Notice status='premium' isIcon={true} className='mt20'>
          {__('Controls Border and Hover Border settings are available in the Pro version.', 'audio-player-block')}
        </Notice>
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Time", "audio-player-block")}
        initialOpen={false}
      >
        <Typography
          className="mt20"
          label={__("Time Typo", "audio-player-block")}
          value={time.typo}
          onChange={(val) => updateObj("style", val, "time", "typo")}
        />

        <ColorsControl
          label={__("Colors", "audio-player-block")}
          value={time.colors}
          onChange={(val) => updateObj("style", val, "time", "colors")}
        />

        <Notice status='premium' isIcon={true} className='mt20'>
          {__('Time Display Radius setting is available in the Pro version.', 'audio-player-block')}
        </Notice>
      </PanelBody>

    </>
  );
};
export default Style;
