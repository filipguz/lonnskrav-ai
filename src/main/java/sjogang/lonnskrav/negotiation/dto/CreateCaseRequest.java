package sjogang.lonnskrav.negotiation.dto;

public record CreateCaseRequest(
        String title,
        Integer negotiationYear,
        String orgNumber
) {
}