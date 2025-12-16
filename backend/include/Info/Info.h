#ifndef INFO_H
#define INFO_H

#include <string>

enum class Info {
    VertexAdded,
    EdgeAdded,
    VertexDeleted,
    EdgeDeleted,
    Outdegree,
    Indegree,
    Degree,
    NonCycled,
    Unreachable,
    NoUnreachable,
    GraphSaved,
    GraphLoaded,
    GraphReversed,
    NotLoadedOrEmpty,
    Error
};

void printInfo(Info code, std::string info = "", std::string parameter = "");

#endif