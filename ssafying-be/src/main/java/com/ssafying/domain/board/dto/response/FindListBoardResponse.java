package com.ssafying.domain.board.dto.response;

import com.ssafying.domain.board.entity.CategoryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class FindListBoardResponse {
    String userName;

    boolean isAnonymous;

    String title;

    CategoryStatus category;

    LocalDateTime createAt;
}
