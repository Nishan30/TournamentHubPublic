"use client"

import {
  IconButton,
  Icon,
} from "@stellar/design-system";
import { Button } from "../ui/button";
import { Heading } from "../Heading";
import { Card } from "../ui/card";
import { copyContent } from "../../helpers/dom";

interface TxResultProps {
  resultXDR: string;
  onClick: () => void;
}

export const TxResult = (props: TxResultProps) => (
  <>
    <Heading as="h1">
      Transaction Result
    </Heading>
    <div className="signed-xdr">
      <p className="detail-header">Result XDR</p>
      <Card >
        <div className="xdr-copy">
          <IconButton
            altText="copy result xdr data"
            icon={<Icon.ContentCopy key="copy-icon" />}
            onClick={() => copyContent(props.resultXDR)}
          />
        </div>
        <div className="xdr-data">{props.resultXDR}</div>
      </Card>
    </div>
    <div className="submit-row-send">
      <Button onClick={props.onClick}>
        Start Over
      </Button>
    </div>
  </>
);
