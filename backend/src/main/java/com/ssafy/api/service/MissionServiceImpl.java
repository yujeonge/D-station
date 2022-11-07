package com.ssafy.api.service;

import com.ssafy.api.response.mission.MissionRes;
import com.ssafy.db.entity.Mission;
import com.ssafy.db.entity.MissionCompleted;
import com.ssafy.db.entity.Satellite;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.MissionCompletedRepository;
import com.ssafy.db.repository.MissionRepository;
import com.ssafy.db.repository.SatelliteRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MissionServiceImpl implements MissionService{

    @Autowired
    MissionRepository missionRepository;

    @Autowired
    MissionCompletedRepository missionCompletedRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SatelliteRepository satelliteRepository;

    @Override
    public List<MissionRes> getMissionList() {
        List<MissionRes> list = missionRepository.findAll()
                .stream().map(m -> MissionRes.of(m)).collect(Collectors.toList());
        return list;
    }

    @Override
    public Optional<Mission> getMission(Long uid) {
        Optional<Mission> mission = missionRepository.getMissionByUid(uid);
        if ( mission.isPresent() ) {
            return mission;
        }
        return Optional.empty();
    }

    @Override
    public List<MissionRes> getMissionsBySUid(Long uid) {
        Optional<Satellite> satellite = satelliteRepository.getSatelliteByUid(uid);
        List<MissionRes> list = missionRepository.getAllBySatellite(satellite.get())
                .stream().map(m -> MissionRes.of(m)).collect(Collectors.toList());
        return list;
    }

    @Override
    public boolean changeMissionCompleted(Mission mission, String userId) {
        Optional<User> user = userRepository.getUsersById(userId);
        // 유저가 존재하면
        if (user.isPresent()) {
            // mission_completed안에 없을 때
            Optional<MissionCompleted> missionCompleted = missionCompletedRepository.getMissionCompletedByUserAndMission(user.get(), mission);
            if (!missionCompleted.isPresent()) {
                MissionCompleted mc = MissionCompleted.builder()
                        .completed(true)
                        .user(user.get())
                        .mission(mission)
                        .build();
                missionCompletedRepository.save(mc);
                // 경험치 + 5
                user.get().addExp(user.get().getExp());
                userRepository.save(user.get());
                return true;
            // mission_completed안에 있을 때
            } else {
                missionCompletedRepository.delete(missionCompleted.get());
                // 경험치 - 5
                user.get().subtractExp(user.get().getExp());
                userRepository.save(user.get());
                return true;
            }
        }
        return false;
    }
}
