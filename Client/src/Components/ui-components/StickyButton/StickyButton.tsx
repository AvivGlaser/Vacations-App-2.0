import { SpeedDial, Tooltip } from "@mui/material";
import React from "react";
import Badge from "@mui/material/Badge";
import { IStickyButton } from "../../../Helpers/interfaces";

export function StickyButton(props: IStickyButton) {
  const { event, icon, className, tooltip, badgeContent, placement='top' } = props;
  return (
    <>
      <Tooltip title={tooltip} placement={placement}>
        <SpeedDial
          onClick={event}
          className={className}
          ariaLabel="SpeedDial basic example"
          icon={
            <Badge
              showZero={true}
              color="secondary"
              badgeContent={badgeContent}
            >
              {icon}
            </Badge>
          }
        />
      </Tooltip>
    </>
  );
}
