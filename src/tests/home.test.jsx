import { fireEvent, render, screen, renderHook } from '@testing-library/react';
import React from 'react';
import Home from "../layout/views/Home.jsx";
import { describe, it, expect } from 'vitest';

describe("home page tests", () => {
    it("filter select works as intended", ()=> {
        // Render component
        render(<Home/>)
        screen.debug()
        // Get filter button and its boxes
        const filterBtn = screen.getByTestId("filter-btn")
        const filterState = screen.getByTestId("filter-status")
        fireEvent.click(filterBtn)

        // // Get invoice filter selection
        const paid = screen.getByTestId('option-paid')
        const pending = screen.getByTestId('option-pending')
        const draft = screen.getByTestId('option-draft')

        // // simulate clicking on each
        fireEvent.click(paid)
        expect(filterState).toBe("paid")
        fireEvent.click(pending)
        expect(filterState).toBe("pending")
        fireEvent.click(draft)
        expect(filterState).toBe("draft")
    });

    it("theme toggle works as intended", ()=> {
        // Render component
        render(<Home/>)

        // get theme data and button
        const themeStatus = screen.getByTestId("theme-status")
        const themeBtn = screen.getByTestId("theme-btn")
    

        expect(themeStatus).toBe("light")
        fireEvent.click(themeBtn)
        expect(themeStatus).toBe("dark")
        fireEvent.click(themeBtn)
        expect(themeStatus).toBe("light")
        
    });


})



