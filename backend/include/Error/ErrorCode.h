#ifndef ERRORCODE_H
#define ERRORCODE_H

#include <string>

enum class ErrorCode {
    NotUniqueEdge,
    NotUniqueVertex,
    NotFindEdge,
    NotFindVertex,
    FileNotFound,
    FileNotOpened,
    FileErrorGraphType,
    NotOutdegree,
    NotIndegree,
    NotReverseOperation,
    UnexpectedError
};

void printError(ErrorCode code, std::string info = "");

#endif