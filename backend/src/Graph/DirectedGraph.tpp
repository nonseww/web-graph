#include "Graph/DirectedGraph.h"
#include "Entities/AdmissibleEdge.h"
#include <iostream>
#include <algorithm>
#include <cmath>
#include <queue>
#include <limits>
#include <fstream>

using namespace std;

string trim(const string& s) {
    const string whitespace = " \t\n\r\f\v";
    size_t start = s.find_first_not_of(whitespace);
    if (start == string::npos) return string();
    size_t end = s.find_last_not_of(whitespace);
    return s.substr(start, end - start + 1);
}

template <typename T>
DirectedGraph<T>::DirectedGraph(const string fileContent) {
    stringstream file(fileContent);
    string line;
    getline(file, line);
    string type;
    stringstream ss0(line);
    ss0 >> type;
    while (getline(file, line)) {
        if (!line.empty()) {
            stringstream ss(line);
            
            string valueStr;
            getline(ss, valueStr, ':');
            T value = trim(valueStr);

            this->addVertex(value, true);
            string rest;
            getline(ss, rest);

            if (rest == "No edges") continue;

            size_t pos = 0;
            while(true) {
                size_t start = rest.find('(', pos);
                if (start == string::npos) break;
                size_t end = rest.find(')', start);
                if (end == string::npos) break;

                string edgeStr = rest.substr(start + 1, end - start - 1);
                pos = end + 1;

                stringstream ess(edgeStr);
                string vStr, wStr, label;
                getline(ess, vStr, ',');
                getline(ess, wStr, ',');
                getline(ess, label);

                T vertex = trim(vStr);
                int weight = stoi(trim(wStr));
                label = trim(label);
                this->addEdge(value, this->toEdge(vertex, weight, this->trim(label)));
            }
        }
    }
}


template <typename T>
// добавление ребра по вершине1 и вершине2 + вес + label
bool DirectedGraph<T>::addEdge(const T& value, const Edge<T>& edge) {
    this->addVertex(value, false);
    if (this->hasEdge(value, edge.vertex)) {
        return false;
    }
    this->graph[value].push_back(edge);
    this->addVertex(edge.vertex, false);
    return true;
}

template <typename T>
// добавление ребра по вершине1 и вершине2
bool DirectedGraph<T>::addEdge(const T& value, const T& edge) {
    return this->addEdge(value, this->toEdge(edge));
}

template <typename T>
// добавление ребра по вершине1 и вершине2 + весу
bool DirectedGraph<T>::addEdge(const T& value, const T& edge, int weight) {
    return this->addEdge(value, this->toEdge(edge, weight));
}

template <typename T>
// добавление ребра по вершине1 и вершине2 + весу + метке
bool DirectedGraph<T>::addEdge(const T& value, const T& edge, int weight, string label) {
    return this->addEdge(value, this->toEdge(edge, weight, label));
}

template <typename T>
// удаление вершины
bool DirectedGraph<T>::deleteVertex(const T& value) {
    if (!this->hasVertex(value)) {
        return false;
    }
    this->graph.erase(value);
    for (const auto& [vertex, edges] : this->graph) {
        typename vector<Edge<T>>::iterator it = this->findEdge(vertex, value);
        if (it != this->graph[vertex].end()) {
            this->graph[vertex].erase(it);
        }
    }
    return true;
}

template <typename T>
// удаление ребра
bool DirectedGraph<T>::deleteEdge(const T& value, const T& edge) {
    typename vector<Edge<T>>::iterator it = this->findEdge(value, edge);
    if (it == this->graph[value].end()) {
        return false;
    }
    this->graph[value].erase(it);
    return true;
}

template <typename T>
// полустепень исхода
int DirectedGraph<T>::getOutdegree(const T& vertex) {
    return this->graph[vertex].size();
}

template <typename T>
// полустепень захода
int DirectedGraph<T>::getIndegree(const T& vertex) {
    int count = 0;
    for (const auto& [key, edges] : this->graph) {
        if (this->hasEdge(key, vertex)) count++;
    }
    return count;
}

template <typename T>
// степень вершины
int DirectedGraph<T>::getDegree(const T& vertex) {
    return this->getOutdegree(vertex) + this->getIndegree(vertex);
}

template <typename T>
// обращение графа
string DirectedGraph<T>::reverse() {
    DirectedGraph<T> dirGraph;
    for (const auto& [vertex, edges] : this->graph) {
        if (edges.size() == 0) dirGraph.addVertex(vertex);
        for (const auto& edge : edges) {
            dirGraph.addEdge(edge.vertex, vertex, edge.weight, edge.label);
        }
    }
    return dirGraph.toJSON();
}

template <typename T>
std::string DirectedGraph<T>::kruskal() {
    std::stringstream ss;
    ss << "{";
    ss << "\"directed\":true,";

    ss << "\"nodes\":[";
    bool first = true;
    for (auto& [u, _] : this->graph) {
        if (!first) ss << ",";
        first = false;
        ss << "{\"id\":\"" << u << "\"}";
    }
    ss << "],";

    ss << "\"edges\":[]";
    ss << "}";

    return ss.str();
}


// преобразование графа к потоковому графу
template <typename T>
map<T, vector<FlowEdge<T>>> DirectedGraph<T>::convertGraph() {
    map<T, vector<FlowEdge<T>>> flowGraph;
    for (auto& [u, edges] : this->graph) {
        for (auto& e : edges) {
            T v = e.vertex;
            int cap = e.weight;
            int revIndex = flowGraph[v].size();
            int uIndex = flowGraph[u].size();
            flowGraph[u].push_back({v, revIndex, cap, 0});
            flowGraph[v].push_back({u, uIndex, 0, 0});
        }
    }
    return flowGraph;
}

// поиск максимальной пропускной способности для дельты
template <typename T>
int findMaxCapacity(const map<T, vector<FlowEdge<T>>>& flowGraph) {
    int maxCapacity = 0;
    for (auto& [_, edges] : flowGraph) {
        for (auto& e : edges) {
            if (e.cap > maxCapacity) {
                maxCapacity = e.cap;
            }
        }
    }
    return maxCapacity;
}

// вычисление дельты
template <typename T>
int findDelta(const map<T, vector<FlowEdge<T>>>& flowGraph) {
    int maxCapacity = findMaxCapacity(flowGraph);
    if (maxCapacity == 0) return 0;
    int delta = 1;
    while (delta <= maxCapacity) delta <<= 1;
    delta >>= 1;
    // int n = flowGraph.size();
    // int delta = maxCapacity / n;
    return max(delta, 1);
}

// BFS для построения admissible graph
template <typename T>
bool buildLevelGraph(
    const map<T, vector<FlowEdge<T>>>& flowGraph, 
    T s, T t, 
    map<T, int>& level, 
    int delta
) {
    for (auto& [u, _] : flowGraph) level[u] = -1;
    queue<T> q;
    level[s] = 0;
    q.push(s);

    while (!q.empty()) {
        T u = q.front();
        q.pop();
        for (const auto& e : flowGraph.at(u)) {
            if (e.cap - e.flow >= delta && level[e.to] == -1) {
                level[e.to] = level[u] + 1;
                q.push(e.to);
            }
        }
    }
    return level[t] != -1;
}

// построение admissible graph
template <typename T>
void buildAdmissibleGraph(
    const map<T, vector<FlowEdge<T>>>& flowGraph, 
    map<T, int>& level,
    int delta,
    map<T, vector<AdmissibleEdge<T>>>& admissibleGraph
) {
    for (auto& [u, _] : admissibleGraph) {
        admissibleGraph[u].clear();
    }

    for (auto& [u, edges] : flowGraph) {
        if (level[u] == -1) continue;

        for (int i = 0; i < edges.size(); ++i) {
            const auto& e = edges[i];
            if (e.cap - e.flow <= 0) continue;
            bool isAdmissible = false;
            bool isSpecial = false;

            if (level[e.to] != -1 && level[e.to] == level[u] + 1 && e.cap - e.flow >= delta) {
                isAdmissible = true;
            }
            else if (level[e.to] != -1 && level[e.to] == level[u] && e.cap - e.flow >= delta / 2) {
                isAdmissible = true;
                isSpecial = true;
            }

            if (isAdmissible) {
                admissibleGraph[u].push_back({i, isSpecial});
            }
        }
    }
}

// проталкиваем поток через dfs
template <typename T>
int dfs(
    T u, T t, 
    int flow, 
    int delta, 
    std::map<T, std::vector<FlowEdge<T>>>& flowGraph, 
    std::map<T, std::vector<AdmissibleEdge<T>>>& admissibleGraph,
    std::map<T, int>& ptr,
    map<T, bool>& visited
) {
    if (u == t) return flow;

    visited[u] = true;
    auto& admissibleEdges = admissibleGraph[u];
    
    for (int &i = ptr[u]; i < (int)admissibleEdges.size(); ++i) {
        const auto& admissibleEdge = admissibleEdges[i];
        int edgeIndex = admissibleEdge.edgeIndex;
        bool isSpecial = admissibleEdge.isSpecial;

        FlowEdge<T>& e = flowGraph[u][edgeIndex];
        if (visited[e.to] || e.cap - e.flow <= 0) continue;

        int minRequired = isSpecial ? delta / 2 : delta; 

        int pushed = dfs(e.to, 
                        t, 
                        min(flow, e.cap - e.flow), 
                        delta,
                        flowGraph,
                        admissibleGraph,
                        ptr,
                        visited);

        if (pushed > 0) {
            e.flow += pushed;
            flowGraph[e.to][e.rev].flow -= pushed;
            visited[u] = false;
            return pushed;
        }
    }
    visited[u] = false;
    return 0;
}

template<typename T>
string DirectedGraph<T>::maxFlow(T s, T t) {
    map<T, vector<FlowEdge<T>>> flowGraph = this->convertGraph();
    int delta =  findDelta(flowGraph);
    map<T, int> level;
    map<T, int> ptr;
    map<T, bool> visited;
    map<T, vector<AdmissibleEdge<T>>> admissibleGraph;
    int flow = 0;

    for (auto& [u, _] : flowGraph) {
        admissibleGraph[u] = vector<AdmissibleEdge<T>>();
        visited[u] = false;
    }

    while (delta >= 1) {
        while (buildLevelGraph(flowGraph, s, t, level, delta)) {
            buildAdmissibleGraph(flowGraph, level, delta, admissibleGraph);
            
            // поиск блокирующего потока
            bool foundPath = true;
            while (foundPath) {
                for (auto& [u, _] : flowGraph) {
                    ptr[u] = 0;
                    visited[u] = false;
                }
                int pushed = dfs(s, t, INT32_MAX, delta, flowGraph, admissibleGraph, ptr, visited);
                
                if (pushed > 0) {
                    flow += pushed;
                    buildAdmissibleGraph(flowGraph, level, delta, admissibleGraph);
                }
                else {
                    foundPath = false;
                }
            }
        }
        delta /= 2;
    }
    return Graph<T>::toFlowJSON(flowGraph, flow);
}

template <typename T>
string DirectedGraph<T>::toJSON() {
    return Graph<T>::toJSON(true);
}