package com.example.senior.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "analysis")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class AnalysisEntity {
    @Id
    @Column(length = 600, name = "user_id", nullable = false)
    private Long userId;
    @Column(length = 600, name = "symbol")
    private String symbol;
    @Column(length = 600, name = "interval")
    private String interval;
    @Column(name = "start", nullable = false)
    private boolean start;
}
