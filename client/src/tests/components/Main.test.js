import React from "react";
import Main from "../../src/components/Main";
import DocumentTitle from "react-document-title";
import faviconImage from "../../src/images/icds.ico";
import Favicon from "react-favicon";
import Header from "../../src/components/Header";
import NavMenu from "../../src/components/NavMenu";
import {shallow} from "enzyme";

describe('Main component', () => {

    let mainComponent = shallow(<Main/>);

    it('renders without crashing', () => {
        shallow(<Main/>);
    });

    it('has DocumentTitle', () => {
        const documentTitle = <DocumentTitle title={"BFR"}/>;
        expect(mainComponent).toContainReact(documentTitle);
    });

    it('has Favicon', () => {
        const favicon = <Favicon url={faviconImage}/>;
        expect(mainComponent).toContainReact(favicon);
    });

    it('has Header', () => {
        const header = <Header title={"ICDS"} date={"January 2018"}/>;
        expect(mainComponent).toContainReact(header);
    });

    it('has NavMenu', () => {
        const navMenu = <NavMenu/>;
        expect(mainComponent).toContainReact(navMenu);
    });
})