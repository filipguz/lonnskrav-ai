package sjogang.lonnskrav.analysis.application;

import org.springframework.stereotype.Service;
import sjogang.lonnskrav.analysis.domain.AnalysisResult;
import sjogang.lonnskrav.negotiation.domain.NegotiationCase;

@Service
public class AnalysisService {

    public AnalysisResult analyze(NegotiationCase nc) {

        // Midlertidig mock-logikk
        int economy = 7;
        int productivity = 6;
        int outlook = 8;
        int competitiveness = 5;

        int total = economy + productivity + outlook + competitiveness;

        String recommendation;

        if (total > 26) {
            recommendation = "HIGH_INCREASE";
        } else if (total > 20) {
            recommendation = "MODERATE_INCREASE";
        } else {
            recommendation = "LOW_INCREASE";
        }

        return new AnalysisResult(
                economy,
                productivity,
                outlook,
                competitiveness,
                recommendation
        );
    }
}