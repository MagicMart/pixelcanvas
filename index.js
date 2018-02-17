/*jslint browser: true*/
/*global  $*/
$(function () {
    "use strict";
    //the table where the grid will be built
    const PIXELCANVAS = $("#pixel_canvas");
    const PALETTE = $("#palette"); //color selection table
    const BODY = $("body");
    let colorPicker = "rgb(0, 0, 0)";
    $("#colorPicker").on("change", function (e) {
        colorPicker = $(e.target).val();
    });

    // determine wether mouse is down or not
    let mouseDown = false;
    PIXELCANVAS.on("mousedown", function () {
        mouseDown = true;
        return false; //this stops a bug where continuous painting sometimes occurred when mouse was not held down
    });
    BODY.on("mouseup", function () {
        mouseDown = false;
    });
    //fill PALETTE with colours
    function colorPalette() {
        const colorArr = [
            "black",
            "white",
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "indigo",
            "violet",
            "rgb(128,128,128)",
            "rgb(152,152,152)",
            "rgb(169,169,169)",
            "rgb(192,192,192)",
            "rgb(220,220,220)",
            "rgb(240,240,240)"
        ];
        let hue;
        let i;
        for (i = 0; i < 15; i += 1) {
            hue = colorArr[i];

            $(".palette:first")
                .css("background-color", hue)
                .removeClass("palette")
                .addClass("paletteFull");
        }
    }
    // make cells for colour palette
    function palette() {
        PALETTE.children().remove();
        PALETTE.prepend("<tr></tr>");
        const tr = $("tr");
        let i;
        for (i = 1; i <= 15; i += 1) {
            tr.first().append('<td class="palette"></td>');
        }

        colorPalette();
    }
    function makeGrid(ROW, COLUMN) {
        //remove old grid (if any)
        PIXELCANVAS.children().remove();
        //build grid
        let i2;
        for (i2 = 1; i2 <= ROW; i2 += 1) {
            PIXELCANVAS.append("<tr></tr>");
            const tr = $("tr");
            let i;
            for (i = 1; i <= COLUMN; i += 1) {
                tr.last().append("<td class='cell'></td>");
            }
        }
        palette();
    }
    // When size is submitted by the user, call makeGrid
    $("#sizePicker").on("submit", function (e) {
        e.preventDefault(); //prevent the page from reloading

        const ROW = $("#input_height").val();
        const COLUMN = $("#input_width").val();

        makeGrid(ROW, COLUMN);
    });
    //paint when a cell is clicked
    PIXELCANVAS.on("click", ".cell", function (e) {
        const CURRENTCOLOR = $(e.target).css("background-color");

        //current cell will change color

        if (CURRENTCOLOR === "rgba(0, 0, 0, 0)") {
            $(e.target).css("background-color", colorPicker);
        } else {
            $(e.target).css("background-color", "rgba(0, 0, 0, 0)");
        }
    });
    // paint when mouse held down
    PIXELCANVAS.on("mouseenter", ".cell", function (e) {
        if (mouseDown === true) {
            $(e.target).css("background-color", colorPicker);
        }
    });
    // When a PALETTE cell is clicked, colorPicker value is that colour
    PALETTE.on("click", ".paletteFull", function (e) {
        colorPicker = $(e.target).css("background-color");
    });
});
