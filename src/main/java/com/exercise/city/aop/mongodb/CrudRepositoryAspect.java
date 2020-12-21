package com.exercise.city.aop.mongodb;

import com.exercise.city.domain.City;
import com.exercise.city.domain.News;
import com.exercise.city.domain.User;
import com.exercise.city.repository.CustomAuditEventRepository;
import com.exercise.city.repository.NewsRepository;
import com.exercise.city.service.CityService;
import com.exercise.city.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.util.ConcurrencyThrottleSupport;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Aspect
public class CrudRepositoryAspect extends ConcurrencyThrottleSupport {

    private final UserService userService;
    private final CustomAuditEventRepository customAuditEventRepository;
    private final CityService cityService;
    private final NewsRepository newsRepository;

    public CrudRepositoryAspect(UserService userService, CustomAuditEventRepository customAuditEventRepository, CityService cityService, NewsRepository newsRepository) {
        this.userService = userService;
        this.customAuditEventRepository = customAuditEventRepository;
        this.cityService = cityService;
        this.newsRepository = newsRepository;
    }

    @Around("execution(* org.springframework.data.repository.CrudRepository.save(..))")
    public Object save(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();
        Object toSave = args[0];

        if (toSave instanceof News) {
            return handleNews(joinPoint, (News) toSave);
        }
        return joinPoint.proceed();
    }

    @Around("execution(* org.springframework.data.repository.CrudRepository.deleteById(..))")
    public Object delete(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();
        Object toDelete = args[0];

        if (toDelete instanceof String) {
            return handleNewsDelete(joinPoint, (String) toDelete);
        }
        return joinPoint.proceed();
    }

    @Around("execution(* com.exercise.city.service.NewsService.findAllByCityId(..) )")
    public Object findByCity(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();
        Object toFindAllByCityId = args[0];
        if (toFindAllByCityId instanceof String)
            return handleFindByCity(joinPoint, (String) toFindAllByCityId);
        return joinPoint.proceed();
    }

    private <T extends String> Object handleFindByCity(ProceedingJoinPoint joinPoint, String toFindAllByCityId) throws Throwable {
        City city = null;
        final String status;
        if (!toFindAllByCityId.isEmpty()) {
            city = cityService.findOne(toFindAllByCityId)
                .orElse(null);
        }
        if (Objects.nonNull(city)) {
            status = "NEWS AND WEATHER QUERIED BY " + city.getName();
        } else {
            status = "NEWS AND WEATHER QUERIED NO RESULT";
        }
        auditTrace(status);
        return joinPoint.proceed();
    }


    private <T extends News> Object handleNewsDelete(ProceedingJoinPoint joinPoint, String toDelete) throws Throwable {
        Object result = joinPoint.proceed();
        final String status;
        Optional<News> repositoryById = newsRepository.findById(toDelete);

        if (!repositoryById.isPresent()) {
            status = "NEWS DELETED SUCCESSFULLY";
        } else {
            status = "NEWS WAS NOT DELETED SUCCESSFULLY";
        }
        auditTrace(status);
        return result;

    }

    private <T extends News> Object handleNews(
        ProceedingJoinPoint joinPoint,
        T toSave)
        throws Throwable {
        boolean notsaved = toSave.getId() == null;

        Optional.ofNullable(userService.getCurrenUser())
            .filter(user -> notsaved && Objects.nonNull(user.getId()))
            .ifPresent(user -> {
                toSave.setAuthorName(user.getFirstName() + " " + user.getLastName());
                if (StringUtils.isEmpty(toSave.getAuthorId()))
                    toSave.setAuthorId(user.getId());

            });
        News result = (News) joinPoint.proceed(new Object[]{toSave});

        final String status;
        if (Objects.nonNull(result.getId())) {
            status = "NEWS ADDED SUCCESSFULLY";
        } else {
            status = "NEWS WAS NOT ADDED SUCCESSFULLY";
        }
        auditTrace(status);
        return result;
    }

    private void auditTrace(String status) {
        auditTrace(status, new HashMap<>());
    }

    private void auditTrace(String status, Map<String, Object> data) {
        String user = Optional.ofNullable(userService.getCurrenUser())
            .filter(user1 -> Objects.nonNull(user1.getLogin()))
            .map(User::getLogin)
            .orElse("annonymous");
        AuditEvent event = new AuditEvent(user, status, data);
        customAuditEventRepository.add(event);
    }
}
