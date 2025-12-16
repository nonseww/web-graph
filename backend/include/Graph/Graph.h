#ifndef GRAPH_H
#define GRAPH_H

#include <list>
#include <vector>
#include <map>
#include <iostream>
#include <fstream>
#include <string>
#include <tuple>
#include "Entities/Edge.h"
#include "Entities/FullEdge.h"
#include "Entities/FlowEdge.h"

template <typename T>
class Graph {
private:
    void print(std::ostream& out, std::string type);
    bool cycledDfs(const T& vertex, std::map<T, bool>& used, const T& parent = T());
    std::vector<T> unreachableBfs(const T& vertex, std::map<T, bool>& used);
    std::vector<Edge<T>> makeEdgesVector();
protected:
    std::map<T, std::vector<Edge<T>>> graph;
    typename std::vector<Edge<T>>::iterator findEdge(const T& value, const T& edge);
    bool addVertex(const T& value, bool isOriginalRequest);
    void sortGraph();
    std::string trim(const std::string& s);
    T findParent(T v, std::map<T, T>& parent);
    void unite(T a, T b, std::map<T, T>& parent, std::map<T, int>& rank);
    std::string toJSON(bool isDirected);
    std::string toFlowJSON(std::map<T, std::vector<FlowEdge<T>>>& flowGraph, int maxflow);
public:
    Graph() {};
    Graph(const Graph<T>& other);
    static std::string checkType(const std::string& filename);
    bool hasVertex(const T& value);
    bool hasEdge(const T& value, const T& edge);
    bool addVertex(const T& value);
    void printInConsole();
    bool printInFile(const std::string& filename, std::string type);
    Edge<T> toEdge(const T& vertex, int weight = 0, std::string label = "No label");
    int getSize();
    bool hasCycles();
    std::vector<T> findUnreachableVertices(const T& vertex); 
    std::string findGraphCenter(); 
    std::map<T, int> dijkstra(const T& start);
    std::map<T, std::map<T, int>> floydWarshell();
    std::string shortestPaths(const T& u);
    std::string isNegCycleHere(T start);
    bool fordBellman(T start, std::map<T, int>& dist, std::map<T, T>& parent, std::vector<T>& negCycle);


    virtual bool addEdge(const T& value, const T& edge) = 0;
    virtual bool addEdge(const T& value, const T& edge, int weight) = 0;
    virtual bool addEdge(const T& value, const T& edge, int weight, std::string label) = 0;
    virtual bool addEdge(const T& value, const Edge<T>& edge) = 0;
    virtual bool deleteVertex(const T& value) = 0;
    virtual bool deleteEdge(const T& value, const T& edge) = 0;
    virtual int getOutdegree(const T& vertex) = 0;
    virtual int getIndegree(const T& vertex) = 0;
    virtual int getDegree(const T& vertex) = 0;
    virtual std::string reverse() = 0;
    virtual std::string kruskal() = 0;
    virtual std::string maxFlow(T s, T t) = 0;
    virtual std::string toJSON() = 0;
    virtual ~Graph() = default;
};

#include "../../src/Graph/Graph.tpp"

#endif