package sjogang.lonnskrav.analysis.domain;

public class AnalysisResult {

    private int economyScore;
    private int productivityScore;
    private int outlookScore;
    private int competitivenessScore;

    private String recommendation;

    public AnalysisResult(int economyScore,
                          int productivityScore,
                          int outlookScore,
                          int competitivenessScore,
                          String recommendation) {
        this.economyScore = economyScore;
        this.productivityScore = productivityScore;
        this.outlookScore = outlookScore;
        this.competitivenessScore = competitivenessScore;
        this.recommendation = recommendation;
    }

    public int getEconomyScore() { return economyScore; }
    public int getProductivityScore() { return productivityScore; }
    public int getOutlookScore() { return outlookScore; }
    public int getCompetitivenessScore() { return competitivenessScore; }
    public String getRecommendation() { return recommendation; }
}