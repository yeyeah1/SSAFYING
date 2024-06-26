package com.ssafying.domain.user.dto.request;

import com.ssafying.domain.shuttle.entity.CampusRegion;
import com.ssafying.domain.user.entity.UserStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CreateUserRequest {

    @NotNull(message = "캠퍼스 정보 입력은 필수입니다.")
    CampusRegion campusRegion;

    int userId;

    @NotNull(message = "이메일 입력은 필수입니다.")
    String email;

    @NotNull(message = "비밀번호 입력은 필수입니다.")
    String password;

    @NotNull(message = "닉네임 입력은 필수입니다.")
    String nickname;

    @NotNull(message = "휴대폰 번호 입력은 필수입니다.")
    String phoneNumber;

    @NotNull(message = "이름 입력은 필수입니다.")
    String name;

    @NotNull(message = "기수 입력은 필수입니다.")
    int generation;

    int isMajor;

    @Builder.Default
    UserStatus userStatus = UserStatus.ACTIVE;

    @Builder.Default
    String profileImageUrl = "https://firebasestorage.googleapis.com/v0/b/ssafying-5667d.appspot.com/o/%EC%95%A0%EC%98%B9%EC%9D%B4%2F80eppje2E%2BgAAAAAElFTkSuQmCC?alt=media&token=12053ee8-759b-4bde-8c4a-b446aef1a2a3";

}
