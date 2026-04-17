package sjogang.lonnskrav.negotiation.application;

import lombok.RequiredArgsConstructor;
import sjogang.lonnskrav.company.domain.Company;
import sjogang.lonnskrav.company.infrastructure.CompanyRepository;
import sjogang.lonnskrav.negotiation.domain.NegotiationCase;
import sjogang.lonnskrav.negotiation.dto.CreateCaseRequest;
import sjogang.lonnskrav.negotiation.infrastructure.NegotiationCaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NegotiationCaseService {

    private final NegotiationCaseRepository caseRepository;
    private final CompanyRepository companyRepository;

    public NegotiationCase createCase(CreateCaseRequest request) {
        Company company = companyRepository.findByOrgNumber(request.orgNumber())
                .orElseGet(() -> {
                    Company c = new Company();
                    c.setOrgNumber(request.orgNumber());
                    c.setName("Mock Company " + request.orgNumber());
                    return companyRepository.save(c);
                });

        NegotiationCase negotiationCase = new NegotiationCase();
        negotiationCase.setTitle(request.title());
        negotiationCase.setNegotiationYear(request.negotiationYear());
        negotiationCase.setStatus("CREATED");
        negotiationCase.setCompany(company);

        return caseRepository.save(negotiationCase);
    }

    public List<NegotiationCase> getAllCases() {
        return caseRepository.findAll();
    }
}