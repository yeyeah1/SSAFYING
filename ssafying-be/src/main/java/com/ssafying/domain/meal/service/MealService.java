package com.ssafying.domain.meal.service;

import com.ssafying.domain.meal.dto.request.AddMealRequest;
import com.ssafying.domain.meal.dto.request.ModifyMealRequest;
import com.ssafying.domain.meal.dto.request.VoteMealRequest;
import com.ssafying.domain.meal.entity.MealPlanner;
import com.ssafying.domain.meal.entity.MealVote;
import com.ssafying.domain.meal.repository.jdbc.MealRepository;
import com.ssafying.domain.meal.repository.jdbc.MealVoteRepository;
import com.ssafying.domain.shuttle.entity.Campus;
import com.ssafying.domain.shuttle.repository.jdbc.CampusRepository;
import com.ssafying.domain.user.entity.User;
import com.ssafying.domain.user.repository.jdbc.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MealService {

    private final MealRepository mealRepository;
    private final CampusRepository campusRepository;
    private final UserRepository userRepository;
    private final MealVoteRepository mealVoteRepository;

    /**
     * 13.1 식단표 생성
     */
    @Transactional
    public int addMeal(AddMealRequest request) {

        //TODO 해당 날짜로 이미 식단표가 생성되어있다면 익셉션 발생
        // 해당 날짜로 이미 식단표가 있는 경우라면 add 대신 modify를 진행해야함

        // request 로 넘어온 캠퍼스 지역을 찾음
        Campus campus = campusRepository.findByCampusRegion(request.getCampusRegion())
                .orElseThrow(() -> (new RuntimeException("해당 캠퍼스 지역이 존재하지 않습니다.")));

        // 디비에 저장할 MealPlanner 준비
        MealPlanner meal = MealPlanner.createMeal(
                campus,
                request.getMealPlannerDate(),
                request.getMealOrder(),
                request.getMenu(),
                0
        );

        MealPlanner save = mealRepository.save(meal);

        return save.getId();
    }

    /**
     * 13.2 식단표 메뉴 수정
     */
    @Transactional
    public int modifyMeal(int mealPlannerId, ModifyMealRequest request) {

        // 수정하려는 식단표 존재 확인
        MealPlanner mealPlanner = mealRepository.findById(mealPlannerId)
                .orElseThrow(() -> (new RuntimeException("해당 식단표가 존재하지 않습니다.")));

        // 식단표 수정
        mealPlanner.modifyMeal(
                request.getMenu()
        );

        return mealPlanner.getId();
    }

    /**
     * 13.3 식단표 메뉴 투표
     */
    @Transactional
    public int voteMeal(VoteMealRequest request) {

        // 스크랩하려는 유저 확인
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("유저가 없습니다."));

        // request로 넘어온 mealPlannerId가 있는지 확인
        MealPlanner mealPlanner = mealRepository.findById(request.getMealPlannerId())
                .orElseThrow(() -> (new RuntimeException("투표하려는 식단표가 존재하지 않습니다.")));

        // 해당 유저가 해당 식단표 메뉴에 투표를 이미 했는지 확인
        // TODO 그 날에 해당하는 식단표 메뉴 A 혹은 B에 이미 투표했다면 취소를 해줘야할 듯???
        int findVote = mealVoteRepository.findByUserAndMealPlanner(user, mealPlanner);
        if (findVote > 0) throw new RuntimeException("이미 해당 메뉴에 투표하였습니다.");

        //TODO 해당 메뉴는 아니더라도 해당 날에 다른 식단표에 투표를 이미 했다면
        // 그 식단표 mealVote 데이터를 없애고 해당 mealPlanner의 투표값도 -1 해줘야 할 듯 ..???

        // 위의 두 경우가 모두 아니라면
        // 아직 투표 진행을 하지 않은 상태라면
        // 투표를 결과를 반영시켜줌
        MealVote mealvote = MealVote.createMealVote(
                user,
                mealPlanner,
                request.getMenuNum()
        );

        // 투표 결과를 디비에 저장
        MealVote save = mealVoteRepository.save(mealvote);

        // 식단표에 투표수 +1 반영
        mealPlanner.modifyMealVote();

        return save.getId();
    }


    /**
     * 13.4 식단표 조회
     */

}
