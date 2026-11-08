import { baseApi } from "./baseApi";

export interface IPromotionalBannerItem {
  _id: string;
  title?: string;
  subtitle?: string;
  image: string;
  link?: string;
  linkType?: "category" | "custom" | "none";
  categorySlug?: string;
  order?: number;
  isActive: boolean;
}

export const promotionalBannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivePromotionalBanners: builder.query<{
      success: boolean;
      message: string;
      data: IPromotionalBannerItem[];
    }, void>({
      query: () => ({
        url: "/promotional-banners",
        method: "GET",
      }),
      providesTags: ["PromotionalBanners"],
    }),
  }),
});

export const { useGetActivePromotionalBannersQuery } = promotionalBannerApi;

