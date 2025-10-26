/**
 * OpenAI College Information Service
 * Fetches real-world college data using OpenAI API
 */

export interface CollegeLocation {
  city: string;
  state: string;
  country: string;
}

export interface CollegeTuition {
  in_state: number;
  out_of_state: number;
  room_board: number;
}

export interface CollegeAcademics {
  acceptance_rate: number;
  sat_range: string;
  act_range: string;
  gpa_requirement: number;
}

export interface CollegePrograms {
  strong_programs: string[];
  notable_programs: string[];
}

export interface CollegeCharacteristics {
  type: string;
  size: string;
  setting: string;
  selectivity: string;
}

export interface CollegeAdditionalInfo {
  founded: string;
  motto: string;
  notable_alumni: string[];
  special_features: string[];
}

export interface CollegeInfo {
  name: string;
  location: CollegeLocation;
  tuition: CollegeTuition;
  academics: CollegeAcademics;
  programs: CollegePrograms;
  characteristics: CollegeCharacteristics;
  additional_info: CollegeAdditionalInfo;
}

export interface CollegeInfoResponse {
  success: boolean;
  data: CollegeInfo;
}

export interface MultipleCollegesResponse {
  success: boolean;
  data: Record<string, CollegeInfo>;
}

class OpenAICollegeService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://unsmug-untensely-elroy.ngrok-free.dev';
  }

  private getHeaders() {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add ngrok skip warning header if using ngrok
    if (this.baseUrl.includes('ngrok')) {
      headers['ngrok-skip-browser-warning'] = 'true';
    }

    return headers;
  }

  /**
   * Get comprehensive college information using OpenAI
   */
  async getCollegeInfo(collegeName: string): Promise<CollegeInfoResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/openai/college-info/${encodeURIComponent(collegeName)}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching college info:', error);
      throw error;
    }
  }

  /**
   * Get information for multiple colleges
   */
  async getMultipleCollegesInfo(collegeNames: string[]): Promise<MultipleCollegesResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/openai/multiple-colleges-info`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(collegeNames),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching multiple colleges info:', error);
      throw error;
    }
  }

  /**
   * Format tuition for display
   */
  formatTuition(tuition: CollegeTuition): string {
    if (tuition.in_state === tuition.out_of_state) {
      return `$${tuition.in_state.toLocaleString()}`;
    }
    return `$${tuition.in_state.toLocaleString()} (in-state) / $${tuition.out_of_state.toLocaleString()} (out-of-state)`;
  }

  /**
   * Format acceptance rate for display
   */
  formatAcceptanceRate(rate: number): string {
    return `${(rate * 100).toFixed(1)}%`;
  }

  /**
   * Format location for display
   */
  formatLocation(location: CollegeLocation): string {
    if (location.city === 'Unknown' || location.state === 'Unknown') {
      return 'Location Unknown';
    }
    return `${location.city}, ${location.state}`;
  }
}

// Export singleton instance
export const openaiCollegeService = new OpenAICollegeService();
