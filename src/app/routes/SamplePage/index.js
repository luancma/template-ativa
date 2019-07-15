import React from "react";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";

function SamplePage({ match }) {
  return (
    <div className="app-wrapper">
      <ContainerHeader
        match={match}
        title={<IntlMessages id="pages.samplePage" />}
      />
      <div className="d-flex justify-content-center">
        <h1>
          <IntlMessages id="pages.samplePage.description" />
        </h1>
      </div>
    </div>
  );
}

export default SamplePage;
