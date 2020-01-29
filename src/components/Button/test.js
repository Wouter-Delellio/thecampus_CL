import React from "react";
import { shallow } from "enzyme";
import Button from "./index";

const text = "Test button";
let wrapped = shallow(<Button>{text}</Button>);

describe("Button", () => {
    it("renders the Button children", () => {
        expect(wrapped.find("div").text()).toEqual(text);
    });
});
