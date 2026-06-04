import { __ } from "@wordpress/i18n";
import { PanelBody, SelectControl } from "@wordpress/components";
import { PremiumBadge, PremiumPanel } from "../../../../../../bpl-tools/ProControls";
import { Notice } from "../../../../../../bpl-tools/Components";
import { themeSwitch } from "../../../../utils/functions";
import { themeOptions } from "../../../../utils/options";
import Item from "./Item";
import ItemsPanel from "../../Panel/ItemsPanel/ItemsPanel";

const General = ({ attributes, setAttributes, premiumProps, device, pricingURL }) => {
  const { options = {} } = attributes;
  const { theme } = options;

  return (
    <>
      <PanelBody className="bPlPanelBody" title={__("Add or Remove Audios", "audio-player-block")} >
        <SelectControl
          label={__("Select Theme", "audio-player-block")}
          labelPosition="left"
          help={__(
            "Some settings will change when you change the theme.",
            "audio-player-block"
          )}
          value={theme}
          options={themeOptions}
          onChange={(val) =>
            setAttributes(themeSwitch(val, attributes))
          }
        />
        <Notice status='premium' isIcon={true} className='mt10 mb20'>
          {__('OneHaash, Wooden, Lite, and Card themes are available in the Pro version.', 'audio-player-block')}
        </Notice>
        <ItemsPanel
          {...{ attributes, setAttributes, premiumProps, device }}
          arrKey="audioProperties"
          newItem={{
            title: "Green Chair",
            artist: "Diego Nava",
            cover: {
              id: null,
              url: "",
              alt: "",
              title: "",
              link: "",
            },
            audio: {
              id: null,
              url: "",
              title: "",
            },
          }}
          ItemSettings={Item}
          itemLabel="Audio"
          design="sortable"
        />
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        initialOpen={false}
        title={<>
          {__("Options", "audio-player-block")}
          <PremiumBadge />
        </>}
      >
        <PremiumPanel
          title={__("Options", "audio-player-block")}
          description={__(
            "Auto Play, Loop, and Auto Height (for Lite theme) are available in the Pro version.",
            "audio-player-block"
          )}
          pricingUrl={pricingURL}
        />
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        initialOpen={false}
        title={<>
          {__("Elements", "audio-player-block")}
          <PremiumBadge />
        </>}
      >
        <PremiumPanel
          title={__("Elements", "audio-player-block")}
          description={
            theme === "slider"
              ? __("Range Thumb, Navigation, Download Icon, Current Time & Total Time are available in the Pro version.", "audio-player-block")
              : __("Navigation, Download Icon, Current Time & Total Time are available in the Pro version.", "audio-player-block")
          }
          pricingUrl={pricingURL}
        />
      </PanelBody>
    </>
  );
};
export default General;
