declare module 'data' {
    export interface NewsResult {
        abstract: string;
        byline: object;
        document_type: string;
        headline: HeadLine;
        keywords: object;
        lead_paragraph: string;
        multimedia: object;
        news_desk: string;
        pub_date: string;
        section_name: string;
        snippet: string;
        source: string;
        type_of_material: string;
        uri: string;
        web_url: string;
        word_count: number;
        _id: string;
    }

    export interface HeadLine {
        content_kicker: string;
        kicker: string;
        main: string;
        name: string;
        print_headline: string;
        seo: string;
        sub: string;
    }
  }
  