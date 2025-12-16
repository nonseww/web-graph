#ifndef UNDIRECTEDGRAPH_H
#define UNDIRECTEDGRAPH_H

#include "Graph.h"

template <typename T>
class UndirectedGraph : public Graph<T> {
public:
    using Graph<T>::Graph;
    UndirectedGraph(const std::string fileContent);
    UndirectedGraph(const UndirectedGraph<T>& other) : Graph<T>(other) {};
    bool addEdge(const T& value, const T& edge) override;
    bool addEdge(const T& value, const T& edge, int weight) override;
    bool addEdge(const T& value, const T& edge, int weight, std::string label) override;
    bool addEdge(const T& value, const Edge<T>& edge) override;
    bool deleteVertex(const T& value) override;
    bool deleteEdge(const T& value, const T& edge) override;
    int getOutdegree(const T& vertex) override;
    int getIndegree(const T& vertex) override;
    int getDegree(const T& vertex) override;
    std::string reverse() override;
    std::string kruskal() override;
    std::string maxFlow(T s, T t) override;
    std::string toJSON() override;
};

#include "../../src/Graph/UndirectedGraph.tpp"

#endif