import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

interface Props {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export default function BenefitInput({ onSubmit, isLoading }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim() && !isLoading) {
      onSubmit(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f3f4f6', // light gray background
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 700,
          width: '100%',
          borderRadius: 3,
          boxShadow: 6,
        }}
      >
        <CardContent>
          {/* Header */}
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <HealthAndSafetyIcon sx={{ fontSize: 40, color: '#3f51b5' }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Benefit Inquiry Tool
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Describe your health concern to instantly find relevant benefits.
              </Typography>
            </Box>
          </Stack>

          {/* Input */}
          <TextField
            label="What is your health need?"
            placeholder="e.g., I need to find an in-network physical therapist for a back injury."
            multiline
            rows={5}
            fullWidth
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            sx={{ mb: 2 }}
          />

          <Typography variant="caption" color="text.secondary" display="block" mb={2}>
            Tip: Press <b>Ctrl/Cmd + Enter</b> to submit quickly
          </Typography>

          {/* Buttons */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setText('')}
              disabled={isLoading || !text.trim()}
            >
              Clear
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isLoading || !text.trim()}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? 'Searching...' : 'Find My Benefits'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
