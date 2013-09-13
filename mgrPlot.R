#try error bar on managers data set
require(PerformanceAnalytics)
require(rCharts)

data(managers)
#get Tukey's fivenumbers
managers.five <- 
  t(data.frame(lapply(managers,function(x){return(fivenum(as.vector(x)))})))
managers.five.adj <- data.frame(rownames(managers.five),managers.five,stringsAsFactors = FALSE)
colnames(managers.five.adj) <- c("manager","min","lh","med","uh","max")
managers.five.adj$sd <- managers.five.adj$med - managers.five.adj$lh 

path = "http://timelyportfolio.github.io/rCharts_errorbar"
path=getwd()
mgrPlot <- rCharts$new()
mgrPlot$setLib(path)
mgrPlot$templates$script = paste0(path,"/layouts/chart.html")
mgrPlot$params =  list(
  data = managers.five.adj,
  height = 500,
  width = 1000,
  x = "manager",
  y = "med",
  color = "manager",
  stddev = "sd",
  sdmult = 1
)
mgrPlot