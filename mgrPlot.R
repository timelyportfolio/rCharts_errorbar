#try error bar on managers data set
require(PerformanceAnalytics)
require(rCharts)

data(managers)
#get Tukey's fivenumbers
managers.five <- 
  t(data.frame(lapply(managers,function(x){return(fivenum(as.vector(x)))})))
managers.five.adj <- data.frame(rownames(managers.five),managers.five,stringsAsFactors = FALSE)
colnames(managers.five.adj) <- c("manager","min","lh","med","uh","max")

ePlot$params =  list(
  data = subset(final,category %in% c("qb")),
  height = 500,
  width = 1000,
  x = "player",
  y = "ave",
  color = "player"
)
ePlot