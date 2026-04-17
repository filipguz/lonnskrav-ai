package sjogang.lonnskrav.negotiation.api;

import lombok.RequiredArgsConstructor;
import sjogang.lonnskrav.negotiation.application.NegotiationCaseService;
import sjogang.lonnskrav.negotiation.domain.NegotiationCase;
import sjogang.lonnskrav.negotiation.dto.CreateCaseRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cases")
@RequiredArgsConstructor
public class NegotiationCaseController {

    private final NegotiationCaseService caseService;

    @PostMapping
    public NegotiationCase create(@RequestBody CreateCaseRequest request) {
        return caseService.createCase(request);
    }

    @GetMapping
    public List<NegotiationCase> getAll() {
        return caseService.getAllCases();
    }
}