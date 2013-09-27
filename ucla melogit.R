#all code should be attributed to 
##    UCLA: Statistical Consulting Group
##    R Data Analysis Examples: Mixed Effects Logistic Regression
##    http://www.ats.ucla.edu/stat/r/dae/melogit.htm
##    Accessed 9/27/2013

#require(ggplot2)
#require(GGally)
require(reshape2)
require(lme4)
#require(compiler)
#require(parallel)
#require(boot)

hdp <- read.csv("http://www.ats.ucla.edu/stat/data/hdp.csv")
hdp <- within(hdp, {
  Married <- factor(Married, levels = 0:1, labels = c("no", "yes"))
  DID <- factor(DID)
  HID <- factor(HID)
})


# estimate the model and store results in m
m3a <- glmer(remission ~ Age + LengthofStay + FamilyHx + IL6 + CRP +
  CancerStage + Experience + (1 | DID) + (1 | HID),
  data = hdp, family = binomial, nAGQ=1)

# print the mod results without correlations among fixed effects
print(m3a, corr=FALSE)

dP <- dotplot(
  ranef(m3a, which = "DID", postVar = TRUE),
  scales = list(y = list(alternating = 0))
)

## back into the x, y, and errorbar components by looking at
## both the structure of the dotplot and also the lme4 source
## https://github.com/lme4/lme4/blob/bf060a61168499d314b6248da8b2dc468e3af3c9/R/lmer.R#L2190
str(dP)
## dP$DID$panel.args.common gives us the dotplot se which will be our error portion
## looking at the source from lme4 we get by using attr
##    attr(ranef(m3a, which = "DID", postVar = TRUE)$DID,"postVar")
## dP$DID$panel.args$x or sort(ranef(m3a, which = "DID", postVar = TRUE)$DID[,1]) will be our y
## dP$DID$panel.args$y or just the index will serve as our x

## now that we know our x, y, and errorbar
## make a data.frame that we will use with rCharts

r <- ranef(m3a, which = "DID", postVar = TRUE)$DID
dfForPlot <- data.frame(
  rownames(r),  #this will be our x
  r[,1],            #this will be our y
  as.numeric(attr( r, "postVar" ))  #this will be our se
)
colnames(dfForPlot) <- c("id","intercept","se")

## using very experimental version of rCharts
## require(devtools)
## install_github("rCharts", "timelyportfolio", ref = "test-speedimprove")
require(rCharts)

#set working directory to a local and change setLib and templates$script
#if going to github gh-pages repo not desired
path = "http://timelyportfolio.github.io/rCharts_errorbar"
#path = getwd()
ePlot <- rCharts$new()
ePlot$setLib(path)
ePlot$templates$script = paste0(path,"/layouts/chart.html")
#not the way Ramnath intended but we'll hack away
ePlot$params =  list(
  data = dfForPlot,
  height = 500,
  width = 1000,
  margin = list(top = 10, bottom = 10, right = 50, left = 100),
  x = "id",
  y = "intercept",
  radius = 4,
  sort = list( var = "intercept" ),
  whiskers = "#!function(d){return [d.intercept - 1.96 * d.se, d.intercept + 1.96 * d.se]}!#",
  tooltipLabels = c("id","intercept","se") 
)
ePlot


#let's add the HID to demo facets
r2 <- ranef(m3a, which = "HID", postVar = TRUE)$HID
#use our data frame dfForPlot as our starting point
dfForFacetPlot <- dfForPlot
#add another column variable
dfForFacetPlot$variable = "DID"
#combine the HID with DID to get long form(molten) data.frame
dfForFacetPlot <- rbind(
  dfForFacetPlot,
  data.frame(list(
    id = rownames(r2),  #this will be our x
    intercept = r2[,1],            #this will be our y
    se = as.numeric(attr( r2, "postVar" )),  #this will be our se
    variable = rep("HID", nrow(r2))
  ))
)



#example of facetting
ePlotFacet <- rCharts$new()
ePlotFacet$setLib(path)
ePlotFacet$templates$script = paste0(path,"/layouts/chart.html")
ePlotFacet$params =   list(
  data = dfForFacetPlot,
  height = 500,
  width = 1000,
  margin = list(top = 10, bottom = 10, right = 50, left = 100),
  x = "id",
  y = "intercept",
  radius = 4,
  sort = list( var = "intercept" ),
  whiskers = "#!function(d){return [d.intercept - 1.96 * d.se, d.intercept + 1.96 * d.se]}!#",
  tooltipLabels = c("id","intercept","se"),
  facet = list(x = "variable")  #add y for facet grid
)
ePlotFacet