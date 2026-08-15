package com.carrental.apigateway.filter;

import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RouteValidator {

    public static final List<String> openEndpoints = List.of(
            "/auth/login",
            "/auth/register",
            "/auth/verify",
            "/images"
    );

    public boolean isSecured(String path, String method) {
        if (HttpMethod.OPTIONS.matches(method)) {
            return false;
        }

        if (openEndpoints.stream().anyMatch(path::startsWith)) {
            return false;
        }

        boolean isCarList = HttpMethod.GET.matches(method)
                && (path.equals("/cars") || path.equals("/cars/"));

        return !isCarList;
    }

}
