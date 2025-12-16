#include "Graph/Graph.h"
#include "Graph/DirectedGraph.h"
#include "Graph/UndirectedGraph.h"
#include <emscripten/emscripten.h>
#include <string>

Graph<std::string>* g = nullptr;

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    void load_directedGraph(const char* fileContent) {
        if (g) delete g;
        g = new DirectedGraph<std::string>(std::string(fileContent));
    }

    EMSCRIPTEN_KEEPALIVE
    void load_undirectedGraph(const char* fileContent) {
        if (g) delete g;
        g = new UndirectedGraph<std::string>(std::string(fileContent));
    }

    EMSCRIPTEN_KEEPALIVE
    const char* get_graphJSON() {
        if (!g) return nullptr;
        static std::string result;
        result = g->toJSON();
        return result.c_str();
    }

    EMSCRIPTEN_KEEPALIVE
    void delete_graph() {
        if (g) {
            delete g;
            g = nullptr;
        }
    }

    EMSCRIPTEN_KEEPALIVE
    bool add_vertex(const char* v) {
        if (!g) return false;
        return g->addVertex(std::string(v));
    }

    EMSCRIPTEN_KEEPALIVE
    bool add_edge(const char* v, const char* e, int w, const char* l) {
        if (!g) return false;
        return g->addEdge(std::string(v), std::string(e), w, std::string(l));
    }

    EMSCRIPTEN_KEEPALIVE
    bool delete_vertex(const char* v) {
        if (!g) return false;
        return g->deleteVertex(std::string(v));
    }

    EMSCRIPTEN_KEEPALIVE
    bool delete_edge(const char* v, const char* u) {
        if (!g) return false;
        return g->deleteEdge(std::string(v), std::string(u));
    }

    EMSCRIPTEN_KEEPALIVE
    int get_outdegree(const char* v) {
        if (!g) return -1;
        if (!g->hasVertex(v)) return -2;
        return g->getOutdegree(std::string(v));
    }

    EMSCRIPTEN_KEEPALIVE
    int get_indegree(const char* v) {
        if (!g) return -1;
        if (!g->hasVertex(v)) return -2;
        return g->getIndegree(std::string(v));
    }

    EMSCRIPTEN_KEEPALIVE
    int get_degree(const char* v) {
        if (!g) return -1;
        if (!g->hasVertex(v)) return -2;
        return g->getDegree(std::string(v));
    }

    EMSCRIPTEN_KEEPALIVE
    const char* reverse_graph() {
        if (!g) return nullptr;
        static std::string result;
        result = g->reverse();
        return result.c_str();
    }

    EMSCRIPTEN_KEEPALIVE
    bool check_cycles() {
        if (!g) return false;
        return g->hasCycles();
    }

    EMSCRIPTEN_KEEPALIVE
    const char* find_unreachable(const char* v) {
        if (!g) return nullptr;
        if (!g->hasVertex(v)) return nullptr;
        static std::string result;
        auto unreachable = g->findUnreachableVertices(std::string(v));
        result = "[";
        for (int i = 0; i < unreachable.size(); ++i) {
            result += "\"" + unreachable[i] + "\"";
            if (i + 1 < unreachable.size()) result += ",";
        }
        result += "]";
        return result.c_str();
    }

    EMSCRIPTEN_KEEPALIVE
    const char* kruskal() {
        if (!g) return nullptr;
        static std::string result;
        result = g->kruskal();
        return result.c_str();
    }

    EMSCRIPTEN_KEEPALIVE
    const char* ecc_center_raduis() {
        if (!g) return nullptr;
        static std::string result;
        result = g->findGraphCenter();
        return result.c_str();
    }

    EMSCRIPTEN_KEEPALIVE
    const char* shortest_paths(const char* v) {
        if (!g) return nullptr;
        if (!g->hasVertex(v)) return nullptr;
        static std::string result;
        result = g->shortestPaths(std::string(v));
        return result.c_str();
    }

    EMSCRIPTEN_KEEPALIVE
    const char* is_negcycle_here(const char* start) {
        if (!g) return nullptr;
        if (!g->hasVertex(start)) return nullptr;
        static std::string result;
        result = g->isNegCycleHere(start);
        return result.c_str();
    }

    EMSCRIPTEN_KEEPALIVE
    const char* max_flow(const char* s, const char* t) {
        if (!g) return nullptr;
        static std::string result;
        result = g->maxFlow(s, t);
        return result.c_str();
    }
}