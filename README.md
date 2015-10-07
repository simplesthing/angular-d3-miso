# Angular D3 Miso
Angular D3 chart directives made with the miso d3.chart library.

### [Demo](http://simplesthing.github.io/angular-d3-miso/)

![Example Chart](https://cloud.githubusercontent.com/assets/1259113/9982701/60ed4050-5f99-11e5-945c-b5a9e6092a14.png)

## Installing

You can install angular-d3-miso via [bower](http://bower.io) by running:

    $ bower install angular-d3-miso


You can also install it via [npm](http://npmjs.org) by running:

    $ npm install anglar-d3-miso


## About

The purpose of this module is to demonstrate how to create a configurable and reusable D3 chart using Angular directives for composition and data retrieval and [miso d3.chart](http://misoproject.com/d3-chart/) library for creating extensible D3 visualizations. The reason modules like this are necessary is because both Angular and D3 have their own DOM updating patterns which do not play well with one another out if the box. It is a trivial task to include a D3 chart into an angular application, but responding to data and DOM events can be tedious if you are having to manually connect those updates between the angular digest cycle and d3's event hooks. 


Consider an analytics application made up of many different charts, each chart should all have the same look and feel but not necessarily be made up of the exact same pieces. The UI should be composable in order to easily repeat the pieces that make up a complete chart, such as a chart header with a title, a form control to call to a service for updated data information and any other cohesive elements that each chart would be able to omit or add per chart implementation. By using Angular directives it is possible to make self contained chart directives which can be composed by requiring that each child directive share the same parent controller and configuration object. Now all application specific functionality can be dispatched through the shared chart controller. 


The miso library extends the d3.selection object to add a Chart and a Layer instance to handle the drawing and composition of a D3 chart.


In this way the communication between the parts is controlled by Angular listening to the DOM for events and sending update notifications to D3 via miso's d3.chart object.
