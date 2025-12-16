#ifndef GRAPHUI_H
#define GRAPHUI_H

#include "Graph/Graph.h"

template <typename T>
class GraphUI {
private:
    Graph<T>* graph;
    bool isOwner;
    enum commands {
        EXIT = 0,
        ADD_VERTEX = 1,
        ADD_EDGE = 2,
        DELETE_VERTEX = 3,
        DELETE_EDGE = 4,
        GET_OUTDEGREE = 5,
        GET_INDEGREE = 6,
        GET_DEGREE = 7,
        REVERSE_GRAPH = 8,
        CHECK_CYCLED = 9,
        FIND_UNREACHABLE = 10,
        PRINT_GRAPH = 11,
        SAVE_GRAPH = 12,
        LOAD_GRAPH = 13,
        KRASKAL = 14,
        ECC_CENTER_RADUIS = 15,
        SHORTEST_PATHS = 16,
        IS_NEGCYCLE_HERE = 17,
        MAX_FLOW = 18
    };

public:
    explicit GraphUI(Graph<T>& g) : graph(&g), isOwner(false) {}
    GraphUI(std::string graphType);
    ~GraphUI() {
        if (isOwner) delete graph;
    }

    void run();
    void printCommands();
    void switchCommands(int command);
};

#include "../../src/Graph/GraphUI.tpp"

#endif