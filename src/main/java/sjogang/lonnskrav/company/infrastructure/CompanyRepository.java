package sjogang.lonnskrav.company.infrastructure;

import sjogang.lonnskrav.company.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByOrgNumber(String orgNumber);
}