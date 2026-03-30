import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FAQ {
    question: string;
    answer: string;
}
export type Time = bigint;
export interface Article {
    title: string;
    content: string;
    timestamp: Time;
    category: string;
}
export interface backendInterface {
    addArticle(title: string, content: string, category: string): Promise<bigint>;
    addFAQ(question: string, answer: string): Promise<bigint>;
    getAllArticles(): Promise<Array<Article>>;
    getAllFAQs(): Promise<Array<FAQ>>;
    getArticleById(id: bigint): Promise<Article>;
    getArticlesByCategory(category: string): Promise<Array<Article>>;
    submitConsultation(name: string, email: string, issueType: string, message: string): Promise<void>;
}
