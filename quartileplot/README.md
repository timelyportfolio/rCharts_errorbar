Quartile plot
=============
See this example on [bl.ocks.org](http://bl.ocks.org/iaindillingham/5068071).

Like a box plot, a quartile plot summarises a distribution with five statistics: the median (the dot); the upper quartile and the maximum value (either end of the upper centre line); and the lower quartile and the minimum value (either end of the lower centre line). However, a quartile plot reduces a box plot's glyphs to one dot and two lines, so it has a larger data-ink ratio.

For more information about quartile plots, see:

* Tufte, E.R., 2001. <em>The Visual Display of Quantitative Information</em>. 2nd ed. Cheshire, CT, USA: Graphics Press.

Data
----
[Refractive indices](http://en.wikipedia.org/wiki/Refractive_index) of samples of six types of glass, gathered for criminological investigation ([source](http://archive.ics.uci.edu/ml/machine-learning-databases/glass/)).

API
---
d3.svg.<strong>quartileplot</strong>()

Creates a new quartile plot.

<strong>quartileplot</strong>(<em>selection</em>)

Applies the quartile plot to a selection or transition. The selection must contain an SVG or G element.

quartileplot.<strong>domain</strong>([<em>values</em>])

If <em>values</em> is specified, sets the quartile plot's input domain to the specified array of numbers. The array must contain two elements: the minimum and maximum values. If <em>values</em> is not specified, returns the current domain or `null` if no domain has been specified.

quartileplot.<strong>duration</strong>([<em>duration</em>])

If <em>duration</em> is specified, sets the quartile plot's median circle and centre lines to transition over the specified duration in milliseconds. If <em>duration</em> is not specified, returns the current duration.

quartileplot.<strong>height</strong>([<em>height</em>])

If <em>height</em> is specified, sets the quartile plot's height. If <em>height</em> is not specified, returns the current height.

quartileplot.<strong>radius</strong>([<em>radius</em>])

If <em>radius</em> is specified, sets the radius of the quartile plot's median and outlier circles. If <em>radius</em> is not specified, returns the current radius.

quartileplot.<strong>whiskers</strong>([<em>accessor</em>])

If <em>accessor</em> is specified, sets the function used to compute the quartile plot's whiskers. This function will be passed an array of numbers (in ascending order) from the data bound to the current selection. It should return an array of two elements: the values of the lower and upper whiskers. If <em>accessor</em> is not specified, returns the current whiskers accessor or `null` if no whiskers accessor has been specified.

quartileplot.<strong>y</strong>([<em>accessor</em>])

If <em>accessor</em> is specified, sets the function used to access the values from the data bound to the current selection. If <em>accessor</em> is not specified, returns the current accessor function.
