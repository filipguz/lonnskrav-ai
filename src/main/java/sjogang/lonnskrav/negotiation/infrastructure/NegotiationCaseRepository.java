package sjogang.lonnskrav.negotiation.infrastructure;

import sjogang.lonnskrav.negotiation.domain.NegotiationCase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NegotiationCaseRepository extends JpaRepository<NegotiationCase, Long> {
}