import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";

actor {
  // --- Types and modules ---
  // Article Type
  type Article = {
    title : Text;
    content : Text;
    category : Text;
    timestamp : Time.Time;
  };

  module Article {
    public func compare(article1 : Article, article2 : Article) : Order.Order {
      Int.compare(article1.timestamp, article2.timestamp);
    };
  };

  // FAQ Type
  type FAQ = {
    question : Text;
    answer : Text;
  };

  // Consultation Request Type
  type ConsultationRequest = {
    name : Text;
    email : Text;
    issueType : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // --- Persistent data ---
  var nextArticleId = 0;
  var nextFAQId = 0;
  var nextConsultationId = 0;

  let articles = Map.empty<Nat, Article>();
  let faqs = Map.empty<Nat, FAQ>();
  let consultations = Map.empty<Nat, ConsultationRequest>();

  // --- Article Logic ---
  public shared ({ caller }) func addArticle(title : Text, content : Text, category : Text) : async Nat {
    let id = nextArticleId;
    nextArticleId += 1;

    let article : Article = {
      title;
      content;
      category;
      timestamp = Time.now();
    };

    articles.add(id, article);
    id;
  };

  public query ({ caller }) func getAllArticles() : async [Article] {
    articles.values().toArray().sort();
  };

  public query ({ caller }) func getArticlesByCategory(category : Text) : async [Article] {
    articles.values().toArray().filter(
      func(article) { article.category == category }
    );
  };

  public query ({ caller }) func getArticleById(id : Nat) : async Article {
    switch (articles.get(id)) {
      case (null) { Runtime.trap("Article not found") };
      case (?article) { article };
    };
  };

  // --- FAQ logic ---
  public shared ({ caller }) func addFAQ(question : Text, answer : Text) : async Nat {
    let id = nextFAQId;
    nextFAQId += 1;

    let faq : FAQ = {
      question;
      answer;
    };

    faqs.add(id, faq);
    id;
  };

  public query ({ caller }) func getAllFAQs() : async [FAQ] {
    faqs.values().toArray();
  };

  // --- Consultation Requests ---
  public shared ({ caller }) func submitConsultation(name : Text, email : Text, issueType : Text, message : Text) : async () {
    let id = nextConsultationId;
    nextConsultationId += 1;

    let consultation : ConsultationRequest = {
      name;
      email;
      issueType;
      message;
      timestamp = Time.now();
    };

    consultations.add(id, consultation);
  };
};
