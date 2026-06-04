import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
} from "@wordpress/block-editor";
import { TabPanel } from "@wordpress/components";

import { getByDevice, setByDevice } from "../../../utils/functions";
import { tabController, updateData } from "../../../../../bpl-tools/utils/functions";
import { AdvertiseCard } from "../../../../../bpl-tools/ProControls";
import Advanced from "../../../../../bpl-tools/Advanced";
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { generalStyleTabs } from "../../../utils/options";
import General from "./General/General";
import Style from "./Style/Style";

const Settings = ({ attributes, setAttributes, device, activeIndex, setActiveIndex, siteUrl }) => {
  const { advanced = {} } = attributes;
  const pricingURL = `${siteUrl}/wp-admin/edit.php?post_type=audio_player_block&page=bpmp_demo_page#/pricing`;

  const updateObj = (property, val, ...props) => {
    setAttributes({
      [property]: updateData(attributes[property], val, ...props),
    });
  };

  const props = {
    attributes,
    setAttributes,
    device,
    activeIndex,
    setActiveIndex,
    pricingURL,
  };

  return (
    <>
      <InspectorControls>

        <TabPanel
          className="bPlTabPanel"
          activeClass="activeTab"
          tabs={generalStyleTabs}
          onSelect={tabController}
        >
          {(tab) => (
            <>
              {"general" === tab.name && <General {...props} />}

              {"style" === tab.name && (
                <Style {...props} updateObj={updateObj} />
              )}

              {"advanced" === tab.name && (
                <Advanced
                  advanced={advanced}
                  onChange={(val) => setAttributes({ advanced: val })}
                  enabled={{
                    dimension: ["padding"],
                    background: ["normal", "hover"],
                    borderShadow: ["normal", "hover", "border", "shadow"],
                    responsive: true,
                  }}
                />
              )}
            </>
          )}
        </TabPanel>

        <AdvertiseCard planLink={pricingURL || 'https://bplugins.com/products/audio-player-block/pricing'} />

      </InspectorControls>

      <BlockControls>
        <AlignmentToolbar
          label="Player Alignment"
          value={getByDevice(attributes, "alignment", device)}
          onChange={(val) =>
            setByDevice(setAttributes, "alignment", device, val)
          }
          describedBy={__("Player Alignment")}
          alignmentControls={[
            {
              title: __("Left", "audio-player-block"),
              align: "left",
              icon: "align-left",
            },
            {
              title: __("Center", "audio-player-block"),
              align: "center",
              icon: "align-center",
            },
            {
              title: __("Right", "audio-player-block"),
              align: "right",
              icon: "align-right",
            },
          ]}
        />
      </BlockControls>

    </>
  );
};

export default compose(
  withSelect((select) => {
    return {
      siteUrl: select('core').getSite()?.url,
    };
  })
)(Settings);
